import Image from "next/image";
import BossTable from "./components/BossTable";
import styles from "./styles.module.scss";

export const metadata = {
	title: "Boss Income Tracker",
};

export default function BossesTracker() {
	return (
		<main className={styles.main}>
			<h1>
				<Image src="/images/intense_power_crystal.png" alt="Intense Power Crystal" width={48} height={56} />{" "}
				Tracker
			</h1>

			<BossTable />
		</main>
	);
}