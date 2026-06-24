import type { FocusEvent } from "react";
import type { FieldPath, FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { parseMoneyInput } from "@/utils/financeFormCalculations";
import { formatDecimalExcel3 } from "@/utils/formatters";

/** Saisie texte : normalisation en majuscules (transmission / stockage côté formulaire). */
export function setValueAsUpperFr(v: unknown): string {
  if (v == null) return "";
  return String(v).toLocaleUpperCase("fr-FR");
}

/**
 * Champ montant Excel (virgule, 3 décimales) : à la perte de focus, reformate en `0,000`.
 */
export function registerMontantExcel3<T extends FieldValues>(
  register: UseFormRegister<T>,
  setValue: UseFormSetValue<T>,
  name: FieldPath<T>
) {
  const { onBlur, ...rest } = register(name);
  return {
    ...rest,
    onBlur: (e: FocusEvent<HTMLInputElement>) => {
      onBlur(e);
      const t = e.target.value.trim();
      if (!t) {
        setValue(name, "" as never, { shouldValidate: true, shouldDirty: true });
        return;
      }
      const n = parseMoneyInput(t);
      if (n != null) {
        setValue(name, formatDecimalExcel3(n) as never, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    },
  };
}
