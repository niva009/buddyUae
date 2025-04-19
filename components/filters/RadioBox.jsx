import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

const plans = [
  {
    name: "Low Volume",
  },
  {
    name: "Medium Volume",
  },
  {
    name: "High Volume",
  },
];

export default function RadioBoxes() {
  const [selected, setSelected] = useState(plans[0]);

  return (
    <div className="w-full">
      <RadioGroup value={selected} onChange={setSelected}>
        <div className="flex flex-wrap gap-2">
          {plans.map((plan) => (
            <RadioGroup.Option
              key={plan.name}
              value={plan}
              className={({ active, checked }) =>
                `${
                  active
                    ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                    : ""
                }
                  ${checked ? "bg-blue text-white" : "bg-zinc-200"}
                    relative flex cursor-pointer rounded-full px-5 py-2.5 shadow-sm focus:outline-none`
              }
            >
              {({ checked }) => (
                <>
                  <div className="flex w-full gap-3 items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium  ${
                            checked ? "text-white" : "text-gray-700"
                          }`}
                        >
                          {plan.name}
                        </RadioGroup.Label>
                      </div>
                    </div>
                    {checked && (
                      <div className="shrink-0 text-white">
                        <CheckIcon className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
