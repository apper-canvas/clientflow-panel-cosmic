import Label from "@/components/atoms/Label"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import Textarea from "@/components/atoms/Textarea"

const FormField = ({ label, type = "input", children, className, error, ...props }) => {
  const renderField = () => {
    switch (type) {
      case "select":
        return <Select {...props}>{children}</Select>
      case "textarea":
        return <Textarea {...props} />
      default:
        return <Input {...props} />
    }
  }

  return (
    <div className={className}>
      {label && <Label className="mb-2 block">{label}</Label>}
      {renderField()}
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  )
}

export default FormField