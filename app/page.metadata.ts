import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Shreeyush Dhungana - QA Professional & Computing Student | Portfolio",
    description:
      "Explore the portfolio of Shreeyush Dhungana, a passionate QA professional and BSc Honours Computing student. Specializing in test automation and software quality assurance with AWS certification.",
    keywords:
      "QA, Computing, Software Development, Nepal, AWS Certified, Testing Automation, Quality Assurance, Portfolio",
    openGraph: {
      title: "Shreeyush Dhungana - QA Professional & Computing Student",
      description:
        "Passionate QA professional and computing student specializing in test automation and software quality assurance. AWS certified with strong problem-solving abilities.",
      images: [
        {
          url: "https://th.bing.com/th/id/OIP.31F7heyNrbiTmHBz1Jc1LQHaH3?rs=1&pid=ImgDetMain",
          width: 1200,
          height: 630,
          alt: "Shreeyush Dhungana Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Shreeyush Dhungana - QA Professional & Computing Student",
      description:
        "Passionate QA professional and computing student specializing in test automation and software quality assurance. AWS certified with strong problem-solving abilities.",
      images: ["https://example.com/twitter-image.jpg"],
    },
  };
}
