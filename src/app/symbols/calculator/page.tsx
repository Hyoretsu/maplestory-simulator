"use client";
import CharacterGuard from "@components/CharacterGuard";
import CharacterSelector from "@components/CharacterSelector";
import Footer from "@components/Footer";
import { useCharacters } from "@context/account";
import arcaneSymbols from "@data/equips/arcane_force.json";
import sacredSymbols from "@data/equips/sacred_force.json";
import { SymbolType } from "maple-simulator";
import { useEffect, useMemo, useState } from "react";
import SymbolManager from "./components/SymbolManager";
import SymbolReport from "./components/SymbolReport";
import SymbolSelector from "./components/SymbolSelector";
import styles from "./styles.module.scss";

export default function SymbolCalculator() {
	const { currentCharacter } = useCharacters();

	const [symbolType, setSymbolType] = useState<SymbolType>("Arcane");

	useEffect(() => {
		if (symbolType === "Sacred" && currentCharacter!.level < 260) {
			setSymbolType("Arcane");
		}
	}, [currentCharacter, symbolType]);

	const symbols = useMemo(() => {
		switch (symbolType) {
			case "Arcane": {
				// Remove blank Arcane Symbol
				return arcaneSymbols.slice(1);
			}
			case "Sacred": {
				sacredSymbols[1].name = "Sacred Symbol: Hotel Arcus";

				return sacredSymbols;
			}
		}
	}, [symbolType]);

	return (
		<>
			<main className={styles.main}>
				<h1>
					<img
						src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/assets/2437750.png`}
						alt="Arcane Symbol Selector Coupon"
						title="Arcane Symbol"
					/>
					/
					<img
						src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/assets/2633336.png`}
						alt="Sacred Symbol Selector Coupon"
						title="Sacred Symbol"
					/>
					Calculator
				</h1>

				<CharacterGuard>
					<CharacterSelector />

					{(currentCharacter?.level || 0) < 200 ? (
						<p>Symbols are only available for 200+ characters.</p>
					) : (
						<>
							<SymbolSelector state={[symbolType, setSymbolType]} />

							<SymbolManager type={symbolType} symbols={symbols} />

							<SymbolReport type={symbolType} symbols={symbols} />
						</>
					)}
				</CharacterGuard>
			</main>

			<Footer>
				<p>
					Note: the symbol's level and EXP themselves are the inputs. It's assumed in the calcs that you've
					already done dailies and weeklies.
				</p>
			</Footer>
		</>
	);
}
