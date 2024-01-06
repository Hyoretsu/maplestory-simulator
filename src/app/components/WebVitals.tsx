"use client";
import { useReportWebVitals } from "next/web-vitals";
import { useEffect } from "react";
import { rum } from "../../lib/rum";

export default function WebVitals() {
	useEffect(() => {
		rum.enable();
	}, []);

	useReportWebVitals(metric => {
		// Console
		// console.log(metric);

		// Google Analytics
		window.gtag("event", metric.name, {
			value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
			event_label: metric.id,
			non_interaction: true,
		});

		// Plausible
		window.plausible(metric.name, {
			props: {
				value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
				label: metric.id,
				non_interaction: true,
			},
		});
	});

	return <></>;
}
