import styles from "../styles/Filters.module.css";
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

export default function CustomListbox(props) {
	const [selected, setSelected] = useState("");

	function handleChange(e) {
		props.filter(e);
	}

	useEffect(() => {
		if (selected !== "" && props.isFiltering === false) {
			setSelected("");
		}
	});

	return (
		<Listbox value={selected} onChange={setSelected}>
			<div className="relative">
				<div className={styles.input}>
					<Listbox.Button className="relative w-full cursor-pointer bg-white text-left">
						<span className="block truncate">{selected.name}</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<SelectorIcon
								className="h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</span>
					</Listbox.Button>
				</div>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{props.items.map((item, itemID) => (
							<Listbox.Option
								onClick={() => handleChange(item.name)}
								key={itemID}
								className={({ active }) =>
									`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
										active ? "bg-orange-100 text-orange-900" : "text-gray-900"
									}`
								}
								value={item}
							>
								{({ selected }) => (
									<>
										<span
											className={`block ${
												selected ? "font-medium" : "font-normal"
											}`}
										>
											{item.name}
										</span>
										{selected ? (
											<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-600">
												<CheckIcon className="h-5 w-5" aria-hidden="true" />
											</span>
										) : null}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
}
