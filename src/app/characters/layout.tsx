import CharacterSelector from "@components/CharacterSelector";
import { PropsWithChildren } from "react";
import styles from "./styles.module.scss";

export const metadata = {
	title: "Characters",
};

export default function Layout({ children }: PropsWithChildren) {
	return (
		<main className={styles.main}>
			<label htmlFor="character-selector">Current:</label>
			<CharacterSelector allowCreation />

			{children}
		</main>
	);
}
