#!/bin/bash
# Allocate nodes
#SBATCH --nodes=2
# Number of program instances to be executed
#SBATCH --ntasks-per-node=40
# Queue class https://wiki.bwhpc.de/e/BwUniCluster_2.0_Batch_Queues
#SBATCH --partition=multiple
# Maximum run time of job
#SBATCH --time=4:00:00
# Give job a reasonable name
#SBATCH --job-name=starccm-doe
# File name for standard output (%j will be replaced by job id)
#SBATCH --output=logs-%j.out
# File name for error output
#SBATCH --error=logs-%j.out
# send an e-mail when a job begins, aborts or ends
#SBATCH --mail-type=ALL
# e-mail address specification
#SBATCH --mail-user=<HE_USER_ID>@hs-esslingen.de

echo "Starting at "
date

# specify the STAR-CCM+ version to load (available on the cluster)
VERSION="2021.3"

# specify sim case file name
INPUT="test_case.sim"

# specify java macro file name if any
JAVA_FILE=""

# create machinefile
machinefile=hosts.star
scontrol show hostname ${SLURM_JOB_NODELIST} > ${machinefile}

# load the available STAR-CCM+ module
module load cae/starccm+/${VERSION}

# calculate number of nodes
np=${SLURM_NTASKS}
echo "number of procs: $np"

# start a SSH tunnel, creating a control socket.
HE_USER_ID=<HE_USER_ID>
INTERMEDIATE_SERVER="comserver.hs-esslingen.de"
LICENSE_SERVER="lizenz-cd-adapco.hs-esslingen.de"
DEAMON_PORT=49296
SOCKET_NAME='starccm-socket'

[[ -f ${SOCKET_NAME} ]] && rm -f ${SOCKET_NAME}
ssh -MS ${SOCKET_NAME} -fnNT -L 1999:${LICENSE_SERVER}:1999 \
-L ${DEAMON_PORT}:${LICENSE_SERVER}:${DEAMON_PORT} \
${HE_USER_ID}@${INTERMEDIATE_SERVER}

# Test SSH - Tunneling
echo "== ncat output:"
nc -zv localhost 1999
echo "== ncat end"

echo "== ssh check output:"
ssh -S ${SOCKET_NAME} -O check ${HE_USER_ID}@${INTERMEDIATE_SERVER}
echo "== ssh chek end"

# set license variables
export CDLMD_LICENSE_FILE=1999@localhost

# start parallel star-ccm+ job
starccm+ -tokensonly -np ${np} -rsh ssh -mpi openmpi -machinefile ${machinefile} -batch ${JAVA_FILE} ${INPUT}

[[ -f ${machinefile} ]] && rm -f ${machinefile}

# close the SSH control socket
ssh -S ${SOCKET_NAME} -O exit ${HE_USER_ID}@${INTERMEDIATE_SERVER}
[[ -f ${SOCKET_NAME} ]] && rm -f ${SOCKET_NAME}

echo "Run completed at "
date
