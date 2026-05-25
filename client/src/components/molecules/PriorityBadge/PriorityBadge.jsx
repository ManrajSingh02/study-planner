import Badge from '../../atoms/Badge/Badge'
import getPriorityColor from '../../../utils/getPriorityColor'

const PriorityBadge = ({ priority }) => {
  return <Badge text={priority} className={getPriorityColor(priority)} />
}

export default PriorityBadge
