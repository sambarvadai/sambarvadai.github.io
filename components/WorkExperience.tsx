import React from "react";

const jobs = [
    { company: "Stony Brook University", role: "Graduate Research Assistant", period: "Aug. 2025 - Present", location: "New York, NY" },
    { company: "Stony Brook University", role: "Teaching Assistant", period: "Jan. 2025 - May 2025",    location: "New York, NY" },
    { company: "Stony Brook University", role: "Volunteer Researcher", period: "June 2024 - Aug 2024", location: "New York, NY" },
    { company: "Free as the wind", role: "Higher studies prep.",period: "Oct. 2022 - Jul. 2023",   location: "Delhi, IN"},
    { company: "Unilever", role: "Software Development",period: "Jul. 2019 - Sep. 2022",   location: "Bangalore, IN"},
];

const WorkExperience = () => (
    <section id="work" className="px-20 py-24">
        <h2 className="font-is text-5xl mb-10">Work.</h2>
        <div className="w-full rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
            {/* Header */}
            <div
                className="grid grid-cols-4 px-6 py-3"
                style={{ background: "#E8D5C4" }}
            >
                {["Company", "Role", "Period", "Location"].map(h => (
                    <span key={h} className="font-inter text-xs text-neutral-500 uppercase tracking-wide">{h}</span>
                ))}
            </div>
            {/* Rows */}
            {jobs.map((job, i) => (
                <div
                    key={i}
                    className="grid grid-cols-4 px-6 py-5 transition-colors duration-150 hover:brightness-95"
                    style={{ background: i % 2 === 0 ? "#FFF1E9" : "#F0E0D2" }}
                >
                    <span className="font-is text-lg">{job.company}</span>
                    <span className="font-inter text-sm text-neutral-700 self-center">{job.role}</span>
                    <span className="font-inter text-sm text-neutral-500 self-center">{job.period}</span>
                    <span className="font-inter text-sm text-neutral-500 self-center">{job.location}</span>
                </div>
            ))}
        </div>
    </section>
);

export default WorkExperience;
