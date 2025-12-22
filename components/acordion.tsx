import React from "react";

type Data = {
    title: string;
    subtitle: string;
    content: string;
};

type AccordionItem = {
    id: string;
    title: string;
    data: Data[];
};

type AccordionComponentProps = {
    props: AccordionItem[];
};

const AcordionComponent = ({ props }: AccordionComponentProps) => {
    const [open, setOpen] = React.useState<string | null>(null);

    return (
        <div className="mt-5 bg-[#FFFFFF] dark:bg-[#1F1F1F] animate-fadeIn">
            {props.map((acordData) => (
                <div
                    key={acordData.id}
                    className="mb-4 my-10 rounded shadow-md rounded-lg dark:shadow-white shadow-xs/2"
                >
                    <button
                        className="flex w-full items-center justify-between px-4 py-2 text-xl font-semibold text-left"
                        onClick={() =>
                            setOpen(open === acordData.id ? null : acordData.id)
                        }
                    >
                        {acordData.title}
                        <span className="ml-2">
                            {open === acordData.id ? "-" : "+"}
                        </span>
                    </button>

                    {open === acordData.id && (
                        <div className="p-4 animate-fadeIn">
                            {acordData.data.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <h4 className="dark:text-gray-300">
                                        {item.subtitle}
                                    </h4>
                                    <p className="dark:text-gray-400">
                                        {item.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AcordionComponent;
