import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";

type Option = {
  label: string;
  value: string;
};

type DoodleSelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function DoodleSelect({
  options,
  value,
  onChange,
  placeholder = "Select",
}: DoodleSelectProps) {
  return (
    <div className="relative w-full">
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <ListboxButton
            className="
              border border-[var(--color-cloud)] 
              shadow-md 
              rounded-lg 
              h-12 
              px-4 
              focus:ring-2 
              focus:ring-[var(--color-peach)] 
              w-full text-left text-[var(--color-ink)]
            "
            style={{ backgroundColor: "var(--color-sand)" }} 
          >
            {value
              ? options.find((opt) => opt.value === value)?.label
              : placeholder}
          </ListboxButton>

          <ListboxOptions className="absolute mt-1 w-full rounded-lg bg-[var(--color-sand)] shadow-lg z-10">
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-2 text-[var(--color-ink)] ${
                    active ? "bg-[var(--color-peach)]" : ""
                  }`
                }
              >
                {option.label}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
