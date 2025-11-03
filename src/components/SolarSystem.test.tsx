// src/components/SolarSystem.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import SolarSystem from "./SolarSystem";

// Mock de la Web Speech API
beforeAll(() => {
  global.speechSynthesis = {
    speak: jest.fn(),
    cancel: jest.fn(),
  } as any;

  global.SpeechSynthesisUtterance = jest.fn() as any;
});

describe("SolarSystem", () => {
  test("muestra todos los planetas del sistema solar", () => {
    render(<SolarSystem />);

    expect(screen.getByLabelText("Planeta Mercurio")).toBeInTheDocument();
    expect(screen.getByLabelText("Planeta Venus")).toBeInTheDocument();
    expect(screen.getByLabelText("Planeta Tierra")).toBeInTheDocument();
    expect(screen.getByLabelText("Planeta Marte")).toBeInTheDocument();
    expect(screen.getByLabelText("Planeta Júpiter")).toBeInTheDocument();
    expect(screen.getByLabelText("Planeta Saturno")).toBeInTheDocument();
    expect(screen.getByLabelText("Planeta Urano")).toBeInTheDocument();
    expect(screen.getByLabelText("Planeta Neptuno")).toBeInTheDocument();
  });

  test("muestra información del planeta cuando se hace clic", () => {
    render(<SolarSystem />);

    const earthButton = screen.getByLabelText("Planeta Tierra");
    fireEvent.click(earthButton);

    expect(screen.getByText("149.6 millones de km")).toBeInTheDocument();
    expect(screen.getByText("12,742 km")).toBeInTheDocument();
    expect(
      screen.getByText(/Es el único planeta conocido con vida/i)
    ).toBeInTheDocument();
  });

  test("cambia la información cuando se selecciona otro planeta", () => {
    render(<SolarSystem />);

    const marsButton = screen.getByLabelText("Planeta Marte");
    fireEvent.click(marsButton);
    expect(screen.getByText("227.9 millones de km")).toBeInTheDocument();
    expect(screen.getByText(/planeta rojo/i)).toBeInTheDocument();

    const jupiterButton = screen.getByLabelText("Planeta Júpiter");
    fireEvent.click(jupiterButton);
    expect(screen.getByText("778.5 millones de km")).toBeInTheDocument();
    expect(screen.getByText(/planeta más grande/i)).toBeInTheDocument();
  });

  test("reproduce audio cuando se hace clic en el botón", () => {
    render(<SolarSystem />);

    const venusButton = screen.getByLabelText("Planeta Venuss");
    fireEvent.click(venusButton);

    const audioButton = screen.getByRole("button", {
      name: /Escuchar información/i,
    });
    fireEvent.click(audioButton);

    expect(screen.getByText(/Reproduciendo información/i)).toBeInTheDocument();
  });

  test("no muestra información sin seleccionar un planeta", () => {
    render(<SolarSystem />);

    expect(screen.queryByText("149.6 millones de km")).toBeNull();
    expect(screen.queryByText(/Dato curioso/i)).toBeNull();
  });
});