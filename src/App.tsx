import { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';
import * as tools from './tools';

const url = 'https://edwardtanguay.vercel.app/share/germanNouns.json';
const localStorageVariableName = 'german-noun-game-state';

interface INoun {
	article: string;
	singular: string;
	plural: string;
	isOpen: boolean;
	isLearned: boolean;
}

function App() {
	const [nouns, setNouns] = useState<INoun[]>([]);

	useEffect(() => {
		(async () => {
			let _nouns: INoun[] = [];
			const localStorageString = localStorage.getItem(localStorageVariableName);
			if (localStorageString !== null) {
				_nouns = JSON.parse(localStorageString);
			} else {
				let rawNouns = [];
				rawNouns = (await axios.get(url)).data;
				rawNouns = tools.randomize(rawNouns);
				rawNouns.forEach((rawNoun: any) => {
					const _noun: INoun = {
						...rawNoun,
						isOpen: false,
						isLearned: false,
					};
					_nouns.push(_noun);
				});
			}
			setNouns(_nouns);
		})();
	}, []);

	const saveNouns = () => {
		setNouns([...nouns]);
		localStorage.setItem(localStorageVariableName, JSON.stringify(nouns));
	};

	const handleFlashcardClick = (noun: INoun) => {
		noun.isOpen = !noun.isOpen;
		saveNouns();
	};

	const handleMarkAsLearned = (noun: INoun) => {
		noun.isLearned = !noun.isLearned;
		saveNouns();
	};

	const getNumberLearned = () => {
		return nouns.reduce((total, noun) => total + (noun.isLearned ? 1 : 0), 0);
	};

	const handleResetGameButton = () => {
		localStorage.removeItem(localStorageVariableName);
		window.location.reload();
	};

	return (
		<div>
			<h1>German Nouns</h1>
			<h2>
				You have learned {getNumberLearned()} of {nouns.length} nouns:{' '}
				<button onClick={handleResetGameButton}>Reset</button>
			</h2>
			<div className="nouns">
				{nouns.map((noun: INoun) => {
					return (
						<div className="content" key={noun.singular}>
							{!noun.isLearned && (
								<div
									className="card"
									onClick={() => handleFlashcardClick(noun)}
								>
									<div className="card-front">{noun.singular}</div>
									{noun.isOpen && (
										<div className="card-back">
											<div className="singular">
												{noun.article} {noun.singular}
											</div>
											<div className="plural">{noun.plural}</div>
											<button
												onClick={() => handleMarkAsLearned(noun)}
												style={{ cursor: 'pointer' }}
											>
												Mark as learned
											</button>
										</div>
									)}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
