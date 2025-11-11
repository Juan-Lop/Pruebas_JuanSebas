// src/components/ColombianRegions.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import ColombianRegions from "./ColombianRegions";

// Mock de la Web Speech API
beforeAll(() => {
  global.speechSynthesis = {
    speak: jest.fn(),
    cancel: jest.fn(),
  } as any;

  global.SpeechSynthesisUtterance = jest.fn() as any;
});

describe("ColombianRegions", () => {
  test("muestra todas las regiones de Colombia", () => {
    render(<ColombianRegions />);

    expect(screen.getByText("Región Caribe")).toBeInTheDocument();
    expect(screen.getByText("Región Pacífica")).toBeInTheDocument();
    expect(screen.getByText("Región Andina")).toBeInTheDocument();
    expect(screen.getByText("Región Orinoquía")).toBeInTheDocument();
    expect(screen.getByText("Región Amazonía")).toBeInTheDocument();
    expect(screen.getByText("Región Insular")).toBeInTheDocument();
  });

  test("muestra información detallada al seleccionar una región", () => {
    render(<ColombianRegions />);

    const andinaButton = screen.getByText("Región Andina");
    fireEvent.click(andinaButton);

    expect(screen.getByText(/cordillera de los Andes/i)).toBeInTheDocument();
    expect(screen.getByText(/Café/i)).toBeInTheDocument();
    expect(screen.getByText(/Antioquia/i)).toBeInTheDocument();
  });

  test("muestra el botón de iniciar quiz", () => {
    render(<ColombianRegions />);

    const quizButton = screen.getByRole("button", { name: /Iniciar Quiz/i });
    expect(quizButton).toBeInTheDocument();
  });

  test("inicia el modo quiz al hacer clic en el botón", () => {
    render(<ColombianRegions />);

    const quizButton = screen.getByRole("button", { name: /Iniciar Quiz/i });
    fireEvent.click(quizButton);

    expect(screen.getByText(/¿Qué región es?/i)).toBeInTheDocument();
    expect(screen.getByText(/Puntaje:/i)).toBeInTheDocument();
  });

  test("oculta las regiones cuando está en modo quiz", () => {
    render(<ColombianRegions />);

    expect(screen.getByText("Región Caribe")).toBeInTheDocument();

    const quizButton = screen.getByRole("button", { name: /Iniciar Quiz/i });
    fireEvent.click(quizButton);

    expect(screen.queryByText("6 departamentos")).toBeNull();
  });

  test("muestra opciones de respuesta en el quiz", () => {
    render(<ColombianRegions />);

    const quizButton = screen.getByRole("button", { name: /Iniciar Quiz/i });
    fireEvent.click(quizButton);

    // Debe haber 3 botones de opciones (A, B, C)
    const optionButtons = screen.getAllByRole("button");
    const answerButtons = optionButtons.filter(btn => 
      btn.textContent?.includes("Región")
    );
    expect(answerButtons.length).toBe(3);
  });

  test("sale del modo quiz al presionar salir", () => {
    render(<ColombianRegions />);

    const quizButton = screen.getByRole("button", { name: /Iniciar Quiz/i });
    fireEvent.click(quizButton);

    expect(screen.getByText(/¿Qué región es?/i)).toBeInTheDocument();

    const exitButton = screen.getByRole("button", { name: /Salir/i });
    fireEvent.click(exitButton);

    expect(screen.queryByText(/¿Qué región es?/i)).toBeNull();
    expect(screen.getByText("Región Caribe")).toBeInTheDocument();
  });

  test("cambia de región cuando se selecciona otra", () => {
    render(<ColombianRegions />);

    const caribeButton = screen.getByText("Región Caribe");
    fireEvent.click(caribeButton);

    expect(screen.getByText(/mar Caribe/i)).toBeInTheDocument();

    const pacificaButton = screen.getByText("Región Pacífica");
    fireEvent.click(pacificaButton);

    expect(screen.getByText(/océano Pacífico/i)).toBeInTheDocument();
  });

  test("muestra la capital de cada región", () => {
    render(<ColombianRegions />);

    const andinaButton = screen.getByText("Región Andina");
    fireEvent.click(andinaButton);

    expect(screen.getByText(/Bogotá/i)).toBeInTheDocument();
  });

  test("muestra información de economía y cultura", () => {
    render(<ColombianRegions />);

    const caribeButton = screen.getByText("Región Caribe");
    fireEvent.click(caribeButton);

    expect(screen.getByText("Economía")).toBeInTheDocument();
    expect(screen.getByText("Cultura")).toBeInTheDocument();
    expect(screen.getByText(/Carnaval de Barranquilla/i)).toBeInTheDocument();
  });
});