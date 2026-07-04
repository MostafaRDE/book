export function getMermaidConfig(isDark: boolean) {
  const shared = {
    startOnLoad: false,
    securityLevel: "strict" as const,
    fontFamily: "inherit",
    /** ELK stores DOM refs on graph nodes — info/debug logs JSON.stringify them and throw */
    logLevel: "fatal" as const,
    flowchart: {
      htmlLabels: false,
      curve: "basis" as const,
      padding: 20,
      nodeSpacing: 50,
      rankSpacing: 60,
    },
  }

  if (isDark) {
    return {
      ...shared,
      theme: "dark" as const,
      themeVariables: {
        background: "transparent",
        fontFamily: "inherit",
        fontSize: "15px",
        primaryColor: "#1e3a5f",
        primaryTextColor: "#e8edf5",
        primaryBorderColor: "#5b8fd9",
        secondaryColor: "#1a2744",
        secondaryTextColor: "#d8e0ec",
        secondaryBorderColor: "#4a6a9a",
        tertiaryColor: "#152238",
        tertiaryTextColor: "#c8d4e4",
        lineColor: "#6b8cb8",
        textColor: "#e8edf5",
        mainBkg: "#1e3a5f",
        nodeBorder: "#5b8fd9",
        clusterBkg: "#152238",
        titleColor: "#e8edf5",
        edgeLabelBackground: "#152238",
        nodeBorderRadius: "12",
      },
    }
  }

  return {
    ...shared,
    theme: "base" as const,
    themeVariables: {
      background: "transparent",
      fontFamily: "inherit",
      fontSize: "15px",
      darkMode: false,
      primaryColor: "#dce8fa",
      primaryTextColor: "#1a2744",
      primaryBorderColor: "#3d6ec9",
      secondaryColor: "#e8eef6",
      secondaryTextColor: "#1a2744",
      secondaryBorderColor: "#6b8cb8",
      tertiaryColor: "#f2f6fb",
      tertiaryTextColor: "#1a2744",
      tertiaryBorderColor: "#a8bdd4",
      lineColor: "#4a6a9a",
      textColor: "#1a2744",
      mainBkg: "#dce8fa",
      nodeBorder: "#3d6ec9",
      clusterBkg: "#f2f6fb",
      titleColor: "#1a2744",
      edgeLabelBackground: "#f8fafc",
      nodeBorderRadius: "12",
    },
  }
}
