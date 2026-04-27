import Work from "../src/Work.svelte"
import { render } from "@testing-library/svelte"

describe("Work Component", () => {
  test("it exists", async () => {
    const { component } = render(Work, {})

    expect(component).toBeDefined()
  })

  test("it renders the info from attributes", async () => {
    const { getByText } = render(Work, {
      position: "Web Developer",
      company: "My Company",
      url: "https://example.com",
      years: [2019, 2021],
      details: ["Developed A", "Lead team B"],
    })

    expect(getByText("Web Developer")).toBeInTheDocument()
    expect(getByText("My Company")).toBeInTheDocument()
    expect(getByText("2019-2021")).toBeInTheDocument()
    expect(getByText("Developed A")).toBeInTheDocument()
    expect(getByText("Lead team B")).toBeInTheDocument()
  })

  test("it renders multiple periods joined with semicolons", async () => {
    const { getByText } = render(Work, {
      position: "Engineer",
      company: "Acme",
      url: "https://example.com",
      years: ["ignored", "ignored"],
      periods: [
        { start: "Jun 2020", end: "Mar 2021" },
        { start: "Jul 2020", end: "May 2021" },
      ],
      details: [],
    })

    expect(
      getByText("Jun 2020-Mar 2021; Jul 2020-May 2021"),
    ).toBeInTheDocument()
  })
})
