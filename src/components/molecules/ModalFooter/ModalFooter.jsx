import { ButtonSecoundary } from '@atoms/ButtonSecoundary/ButtonSecoundary'
import { ButtonTertiary } from '@atoms/ButtonTertiary/ButtonTertiary'

const ModalFooter = ({ onClose, isLoading }) => {
  return (
    <footer className="flex items-center p-6 space-x-3 border-t border-gray-200 rounded-b rtl:space-x-reverse dark:border-gray-600">
      <ButtonSecoundary
        isLoading={isLoading}
        text={isLoading ? 'Guardando' : 'Guardar cambios'}
      />

      <ButtonTertiary
        isLoading={isLoading}
        onClick={onClose}
        text="Cancelar"
        type="button"
      />
    </footer>
  )
}

export { ModalFooter }
