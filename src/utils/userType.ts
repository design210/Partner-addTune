export default function userType(value: string) {
  const list = value.split(',')
  let storeStatus = list.includes('SYS21811B007')
  let agentStatus
  agentStatus = list.includes('SYS21811B009') || list.includes('SYS21811B010') || list.includes('SYS21811B011')
  return { storeStatus, agentStatus }
}
