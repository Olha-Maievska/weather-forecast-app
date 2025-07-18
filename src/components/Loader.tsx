import { Loader2 } from 'lucide-react'
import styles from '@/styles/Loader.module.scss'

const Loader = () => {
  return (
	<div className={styles.loader}>
	  <Loader2 className={styles.loader__icon} />
	</div>
  )
}

export default Loader
