// src/components/GeometryShapes.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import GeometryShapes from "./GeometryShapes";

describe("GeometryShapes", () => {
  test("muestra todas las figuras geométricas disponibles", () => {
    render(<GeometryShapes />);

    expect(screen.getByText("Cuadrado")).toBeInTheDocument();
    expect(screen.getByText("Rectángulo")).toBeInTheDocument();
    expect(screen.getByText("Círculo")).toBeInTheDocument();
    expect(screen.getByText("Triángulo")).toBeInTheDocument();
  });

  test("calcula el área y perímetro de un cuadrado correctamente", () => {
    render(<GeometryShapes />);

    const squareButton = screen.getByText("Cuadrado");
    fireEvent.click(squareButton);

    const input = screen.getByPlaceholderText(/Ej:/);
    fireEvent.change(input, { target: { value: "5" } });

    const calculateButton = screen.getByRole("button", { name: /Calcular/i });
    fireEvent.click(calculateButton);

    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  test("calcula con números decimales correctamente", () => {
    render(<GeometryShapes />);

    const squareButton = screen.getByText("Cuadrado");
    fireEvent.click(squareButton);

    const input = screen.getByPlaceholderText(/Ej:/);
    fireEvent.change(input, { target: { value: "5.5" } });

    const calculateButton = screen.getByRole("button", { name: /Calcular/i });
    fireEvent.click(calculateButton);

    expect(screen.getByText("30.25")).toBeInTheDocument();
    expect(screen.getByText("22")).toBeInTheDocument();
  });

  test("calcula el área y perímetro de un rectángulo correctamente", () => {
    render(<GeometryShapes />);

    const rectangleButton = screen.getByText("Rectángulo");
    fireEvent.click(rectangleButton);

    const inputs = screen.getAllByPlaceholderText(/Ej:/);
    fireEvent.change(inputs[0], { target: { value: "6" } });
    fireEvent.change(inputs[1], { target: { value: "4" } });

    const calculateButton = screen.getByRole("button", { name: /Calcular/i });
    fireEvent.click(calculateButton);

    expect(screen.getByText("24")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  test("calcula el área y perímetro de un círculo correctamente", () => {
    render(<GeometryShapes />);

    const circleButton = screen.getByText("Círculo");
    fireEvent.click(circleButton);

    const input = screen.getByPlaceholderText(/Ej:/);
    fireEvent.change(input, { target: { value: "3" } });

    const calculateButton = screen.getByRole("button", { name: /Calcular/i });
    fireEvent.click(calculateButton);

    expect(screen.getByText("28.27")).toBeInTheDocument();
    expect(screen.getByText("18.85")).toBeInTheDocument();
  });

  test("limpia los cálculos al presionar el botón limpiar", () => {
    render(<GeometryShapes />);

    const squareButton = screen.getByText("Cuadrado");
    fireEvent.click(squareButton);

    const input = screen.getByPlaceholderText(/Ej:/);
    fireEvent.change(input, { target: { value: "5" } });

    const calculateButton = screen.getByRole("button", { name: /Calcular/i });
    fireEvent.click(calculateButton);

    expect(screen.getByText("25")).toBeInTheDocument();

    const clearButton = screen.getByRole("button", { name: "🔄" });
    fireEvent.click(clearButton);

    expect(screen.queryByText(/Resultados/i)).toBeNull();
  });

  test("no calcula sin ingresar dimensiones", () => {
    render(<GeometryShapes />);

    const triangleButton = screen.getByText("Triángulo");
    fireEvent.click(triangleButton);

    const calculateButton = screen.getByRole("button", { name: /Calcular/i });
    fireEvent.click(calculateButton);

    expect(screen.queryByText(/Resultados/i)).toBeNull();
  });
});
