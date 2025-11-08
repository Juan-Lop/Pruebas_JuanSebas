import { render, screen, fireEvent } from "@testing-library/react";
import GeometryShapes from "./GeometryShapes";

describe("GeometryShapes Component", () => {
  test("muestra todas las figuras geométricas", () => {
    render(<GeometryShapes />);

    expect(screen.getByText("Cuadrados")).toBeInTheDocument();
    expect(screen.getByText("Rectángulo")).toBeInTheDocument();
    expect(screen.getByText("Círculo")).toBeInTheDocument();
    expect(screen.getByText("Triángulo")).toBeInTheDocument();
  });

  test("calcula correctamente el área y perímetro de un cuadrado", () => {
    render(<GeometryShapes />);

    fireEvent.click(screen.getByText("Cuadrado"));

    const input = screen.getByPlaceholderText("Ej: 5 o 5.5");
    fireEvent.change(input, { target: { value: "5" } });

    fireEvent.click(screen.getByRole("button", { name: /Calcular/i }));

    expect(screen.getByText("25")).toBeInTheDocument(); // área
    expect(screen.getByText("20")).toBeInTheDocument(); // perímetro
  });

  test("acepta números decimales correctamente", () => {
    render(<GeometryShapes />);

    fireEvent.click(screen.getByText("Cuadrado"));

    const input = screen.getByPlaceholderText("Ej: 5 o 5.5");
    fireEvent.change(input, { target: { value: "5.5" } });

    fireEvent.click(screen.getByRole("button", { name: /Calcular/i }));

    expect(screen.getByText("30.25")).toBeInTheDocument(); // área
    expect(screen.getByText("22")).toBeInTheDocument(); // perímetro
  });

  test("calcula correctamente el área y perímetro de un rectángulo", () => {
    render(<GeometryShapes />);

    fireEvent.click(screen.getByText("Rectángulo"));

    const inputs = screen.getAllByPlaceholderText(/Ej:/);
    fireEvent.change(inputs[0], { target: { value: "6" } });
    fireEvent.change(inputs[1], { target: { value: "4" } });

    fireEvent.click(screen.getByRole("button", { name: /Calcular/i }));

    expect(screen.getByText("24")).toBeInTheDocument(); // área
    expect(screen.getByText("20")).toBeInTheDocument(); // perímetro
  });

  test("calcula correctamente el área y perímetro de un círculo", () => {
    render(<GeometryShapes />);

    fireEvent.click(screen.getByText("Círculo"));

    const input = screen.getByPlaceholderText("Ej: 5 o 5.5");
    fireEvent.change(input, { target: { value: "3" } });

    fireEvent.click(screen.getByRole("button", { name: /Calcular/i }));

    expect(screen.getByText("28.27")).toBeInTheDocument(); // área
    expect(screen.getByText("18.85")).toBeInTheDocument(); // perímetro
  });

  test("limpia los resultados al presionar el botón 🔄", () => {
    render(<GeometryShapes />);

    fireEvent.click(screen.getByText("Cuadrado"));

    const input = screen.getByPlaceholderText("Ej: 5 o 5.5");
    fireEvent.change(input, { target: { value: "5" } });

    fireEvent.click(screen.getByRole("button", { name: /Calcular/i }));

    expect(screen.getByText("25")).toBeInTheDocument();

    const clearButton = screen.getByRole("button", { name: "🔄" });
    fireEvent.click(clearButton);

    expect(screen.queryByText("¡Resultados!")).toBeNull();
  });

  test("no muestra resultados si no se ingresan dimensiones", () => {
    render(<GeometryShapes />);

    fireEvent.click(screen.getByText("Triángulo"));

    const calculateButton = screen.getByRole("button", { name: /Calcular/i });
    fireEvent.click(calculateButton);

    expect(screen.queryByText("¡Resultados!")).toBeNull();
  });
});
