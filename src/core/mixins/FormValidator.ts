import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  protected formRef = "form-validator-ref";
  get rules() {
    const required = {
      required: (value: string) => {
        return typeof value === "boolean" || typeof value === "number"
          ? true
          : !!value || "Value is required";
      },
      stringLengthMaxMin: (max: number, min: number) => (value?: string) => {
        const fmax = this.stringLengthMax(max)(value);
        if (typeof fmax == "string") return fmax;
        const fmin = this.stringLengthMin(min)(value);
        if (typeof fmin == "string") return fmin;

        return true;
      },
      stringLengthMax: this.stringLengthMax,
      stringLengthMin: this.stringLengthMin,
      email: (value: string) => {
        const pattern = /^(([a-zA-Z-_])([^<>()[\]\\.,;:\s@"!#%*=+{}/'|]+(\.[^<>()[\]\\.,;:\s@"!#%*=+{}/'|]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-_0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Email is invalid";
      },
      phone: (value: string) => {
        const pattern = /^(\+7) \(([0-9]{3})\) ([0-9]{3})-([0-9]{2})-([0-9]{2})$/;
        return pattern.test(value) || "Phone number is invalid";
      },
    };

    const optional = {
      emailOptional: (value: string) => {
        if (!value) return true;
        return required.email(value);
      },
      phoneOptional: (value: string) => {
        if (!value) return true;
        return required.phone(value);
      },
    };

    return {
      ...required,
      ...optional,
    };
  }

  validateForm() {
    return (this.$refs[this.formRef] as Vue & {
      validate: () => boolean;
    }).validate();
  }

  public resetForm() {
    return (this.$refs[this.formRef] as Vue & {
      reset: () => void;
    }).reset();
  }

  private stringLengthMax(max: number) {
    return (value = "") => {
      if (max && value?.length > max) {
        return `Length should not exceed ${max} characters`;
      }
      return true;
    };
  }
  private stringLengthMin(min: number) {
    return (value = "") => {
      if (value?.length < min) {
        return `Length must be higher than ${min} characters`;
      }
      return true;
    };
  }
}
