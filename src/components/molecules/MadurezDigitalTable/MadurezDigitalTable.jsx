const MadurezDigitalTable = ({ averageScore = 0 }) => {
  return (
    <table className="mt-4 text-center text-black bg-white">
      <thead className="text-white">
        <tr>
          <td className="p-2 bg-primary">Color</td>
          <td className="p-2 bg-primary">Nivel Escala Madurez Digital</td>
        </tr>
      </thead>

      <tbody className="border">
        <tr className="border">
          <td className="p-2 font-bold border text-red-color">Rojo</td>
          <td className="p-2 border">De 0% a 20%</td>
        </tr>
        <tr className="border">
          <td className="p-2 font-bold border text-orange-color">Naranja</td>
          <td className="p-2 border">De 21% a 40%</td>
        </tr>
        <tr className="border">
          <td className="p-2 font-bold border text-yellow-color">Amarillo</td>
          <td className="p-2 border">De 41% a 60%</td>
        </tr>
        <tr className="border">
          <td className="p-2 font-bold border text-green-light-color">
            Verde Claro
          </td>
          <td className="p-2 border">De 61% a 80%</td>
        </tr>
        <tr className="border">
          <td className="p-2 font-bold border text-green-dark-color">
            Verde Oscuro
          </td>
          <td className="p-2 border">De 81% a 100%</td>
        </tr>
      </tbody>

      <tfoot>
        <tr className="border">
          <td className="p-2 font-bold border">Tu nivel de madurez</td>
          <td className="p-2 border">{averageScore.toFixed(2)}%</td>
        </tr>
      </tfoot>
    </table>
  )
}

export { MadurezDigitalTable }
