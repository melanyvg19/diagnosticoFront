import { CheckboxRadio } from '@atoms/CheckboxRadio/CheckboxRadio'
import { Input } from '@atoms/Input/Input'
import { InputGroup } from '@layouts/InputGroup/InputGroup'
import { Title } from '@atoms/Title/Title'
import {
  alcanceComercial,
  sectoresEconomicos,
  tiposEmpresa
} from '@utils/Register.util'

const RegisterCompany = ({ formValues, handleChange }) => {
  return (
    <>
      <Title
        text="Información de la empresa"
        className="my-0 text-xl text-start"
      />
      <article className="grid gap-7">
        <InputGroup className="gap-y-7">
          <Input
            className={`${formValues.nitEmpresaNumberError ? 'input--error' : ''}`}
            errorMessage={formValues.nitEmpresaNumberError}
            hasError={!!formValues.nitEmpresaNumberError}
            id="nitEmpresa"
            name="nitEmpresaNumber"
            onChange={handleChange}
            pattern="[0-9\-]+"
            placeholder="NIT"
            type="tel"
            value={formValues.nitEmpresaNumber}
          />

          <Input
            className={`${formValues.nombreEmpresaError ? 'input--error' : ''}`}
            errorMessage={formValues.nombreEmpresaError}
            hasError={!!formValues.nombreEmpresaError}
            id="nombreEmpresa"
            name="nombreEmpresa"
            onChange={handleChange}
            placeholder="Nombre de la empresa"
            type="text"
            value={formValues.nombreEmpresa}
          />
        </InputGroup>

        <Input
          className={`${formValues.direccionPrincipalError ? 'input--error' : ''}`}
          errorMessage={formValues.direccionPrincipalError}
          hasError={!!formValues.direccionPrincipalError}
          id="direccionPrincipal"
          name="direccionPrincipal"
          onChange={handleChange}
          placeholder="Dirección principal"
          type="text"
          value={formValues.direccionPrincipal}
        />

        <Input
          className={`${formValues.cantidadSedesNumberError ? 'input--error' : ''}`}
          errorMessage={formValues.cantidadSedesNumberError}
          hasError={!!formValues.cantidadSedesNumberError}
          id="cantidadSedes"
          name="cantidadSedesNumber"
          onChange={handleChange}
          placeholder="Cantidad de sedes"
          type="number"
          value={formValues.cantidadSedesNumber}
        />

        <div className="-mb-2">
          <div className="flex items-center gap-1">
            <Title
              text="¿Cuenta con establecimientos comerciales?"
              className={`my-0 text-base font-normal text-start ${formValues.establecimientosComercialesNumberError ? 'text-red-500' : ''}`}
            />

            <span className="text-red-500">*</span>
          </div>

          <InputGroup>
            <CheckboxRadio
              checked={formValues.establecimientosComercialesNumber === 1}
              id="siCuenta"
              name="establecimientosComercialesNumber"
              onChange={handleChange}
              text="Sí"
              type="radio"
              value={1}
            />
            <CheckboxRadio
              checked={formValues.establecimientosComercialesNumber === 0}
              id="noCuenta"
              name="establecimientosComercialesNumber"
              onChange={handleChange}
              text="No"
              type="radio"
              value={0}
            />
          </InputGroup>
        </div>

        <div className="-mb-2">
          <div className="flex items-center gap-1">
            <Title
              text="Sector económico"
              className={`my-0 text-base font-normal text-start ${formValues.sectorEconomicoError ? 'text-red-500' : ''}`}
            />

            <span className="text-red-500">*</span>
          </div>

          {sectoresEconomicos.map((sector) => {
            return (
              <CheckboxRadio
                checked={formValues.sectorEconomico === sector}
                id={sector}
                key={sector}
                name="sectorEconomico"
                onChange={handleChange}
                text={sector}
                type="radio"
                value={sector}
              />
            )
          })}
        </div>

        <div className="-mb-2">
          <div className="flex items-center gap-1">
            <Title
              text="Alcance comercial"
              className={`my-0 text-base font-normal text-start ${formValues.alcanceComercialError ? 'text-red-500' : ''}`}
            />

            <span className="text-red-500">*</span>
          </div>

          {alcanceComercial.map((alcance) => {
            return (
              <CheckboxRadio
                checked={formValues.alcanceComercial === alcance}
                id={alcance}
                key={alcance}
                name="alcanceComercial"
                onChange={handleChange}
                text={alcance}
                type="radio"
                value={alcance}
              />
            )
          })}
        </div>

        <div className="-mb-2">
          <div className="flex items-center gap-1">
            <Title
              text="¿La empresa es afiliada a Comfama?"
              className={`my-0 text-base font-normal text-start ${formValues.esAliadoNumberError ? 'text-red-500' : ''}`}
            />

            <span className="text-red-500">*</span>
          </div>

          <InputGroup>
            <CheckboxRadio
              checked={formValues.esAliadoNumber === 1}
              id="siEsAliado"
              name="esAliadoNumber"
              onChange={handleChange}
              text="Sí"
              type="radio"
              value={1}
            />
            <CheckboxRadio
              checked={formValues.esAliadoNumber === 0}
              id="noEsAliado"
              name="esAliadoNumber"
              onChange={handleChange}
              text="No"
              type="radio"
              value={0}
            />
          </InputGroup>
        </div>

        <div className="-mb-2">
          <div className="flex items-center gap-1">
            <Title
              text="Seleccione el tipo de empresa"
              className={`my-0 text-base font-normal text-start ${formValues.idTipoEmpresaError ? 'text-red-500' : ''}`}
            />

            <span className="text-red-500">*</span>
          </div>

          {tiposEmpresa.map((tipoEmpresa) => {
            return (
              <CheckboxRadio
                checked={formValues.idTipoEmpresa === tipoEmpresa.split(' ')[0]}
                id={tipoEmpresa}
                key={tipoEmpresa}
                name="idTipoEmpresa"
                onChange={handleChange}
                text={tipoEmpresa}
                type="radio"
                value={tipoEmpresa.split(' ')[0]}
              />
            )
          })}
        </div>
      </article>
    </>
  )
}

export { RegisterCompany }
