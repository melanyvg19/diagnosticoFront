import { Input } from '@atoms/Input/Input'
import { InputGroup } from '@layouts/InputGroup/InputGroup'
import { Title } from '@atoms/Title/Title'

const RegisterUser = ({ formValues, handleChange }) => {
  return (
    <>
      <Title
        text="Información del usuario"
        className="mb-0 text-xl text-start"
      />
      <article className="grid gap-7">
        <Input
          className={`${formValues.nombreCompletoError ? 'input--error' : ''}`}
          errorMessage={formValues.nombreCompletoError}
          hasError={!!formValues.nombreCompletoError}
          id="nombreCompleto"
          name="nombreCompleto"
          onChange={handleChange}
          placeholder="Nombre completo"
          type="text"
          value={formValues.nombreCompleto}
        />

        <InputGroup className="gap-y-7">
          <Input
            className={`${formValues.cargoError ? 'input--error' : ''}`}
            errorMessage={formValues.cargoError}
            hasError={!!formValues.cargoError}
            id="cargo"
            name="cargo"
            onChange={handleChange}
            placeholder="Cargo"
            type="text"
            value={formValues.cargo}
          />

          <Input
            className={`${formValues.aniosVinculadoNumberError ? 'input--error' : ''}`}
            errorMessage={formValues.aniosVinculadoNumberError}
            hasError={!!formValues.aniosVinculadoNumberError}
            id="aniosVinculado"
            name="aniosVinculadoNumber"
            onChange={handleChange}
            placeholder="Años vinculado"
            type="number"
            value={formValues.aniosVinculadoNumber}
          />
        </InputGroup>

        <Input
          className={`${formValues.usernameError ? 'input--error' : ''}`}
          errorMessage={formValues.usernameError}
          hasError={!!formValues.usernameError}
          id="username"
          name="username"
          onChange={handleChange}
          placeholder="Correo electrónico"
          type="text"
          value={formValues.username}
        />

        <Input
          className={`${formValues.passwordError ? 'input--error' : ''}`}
          errorMessage={formValues.passwordError}
          hasError={!!formValues.passwordError}
          id="password"
          name="password"
          onChange={handleChange}
          placeholder="Contraseña"
          showPasswordIcon={true}
          type="password"
          value={formValues.password}
        />
      </article>
    </>
  )
}

export { RegisterUser }
