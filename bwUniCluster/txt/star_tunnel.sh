#!/bin/bash
# Allocate one node
#SBATCH --nodes=1
# Number of program instances to be executed
#SBATCH --ntasks=40
# Queue class https://wiki.bwhpc.de/e/BwUniCluster_2.0_Batch_Queues
#SBATCH --partition=single
# Maximum run time of job
#SBATCH --time=2:00:00
# Give job a reasonable name
#SBATCH --job-name=starccm-first-run
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

# load the available STAR-CCM+ module
module load cae/starccm+/$VERSION

# calculate number of nodes
np=${SLURM_NTASKS}
echo "number of nodes: $np"

# start a SSH tunnel, creating a control socket.
HE_USER_ID=<HE_USER_ID>
INTERMEDIATE_SERVER='comserver.hs-esslingen.de'
LICENSE_SERVER='lizenz-cd-adapco.hs-esslingen.de'
DEAMON_PORT=49296
SOCKET_NAME='starccm-socket'

[[ -f ${SOCKET_NAME} ]] && rm -f ${SOCKET_NAME}
ssh -MS ${SOCKET_NAME} -fnNT -L 1999:${LICENSE_SERVER}:1999 \
-L ${DEAMON_PORT}:${LICENSE_SERVER}:${DEAMON_PORT} \
${HE_USER_ID}@${INTERMEDIATE_SERVER}

# set license variables: server address and POD key string
export CDLMD_LICENSE_FILE=1999@flex.cd-adapco.com;1999@localhost
export LM_PROJECT=<POD_KEY>

# start parallel star-ccm+ job
starccm+ -power -np $np -batch ${JAVA_FILE} ${INPUT}

# close the SSH control socket
ssh -S ${SOCKET_NAME} -O exit ${HE_USER_ID}@${INTERMEDIATE_SERVER}
[[ -f ${SOCKET_NAME} ]] && rm -f ${SOCKET_NAME}

echo "Run completed at "
date
