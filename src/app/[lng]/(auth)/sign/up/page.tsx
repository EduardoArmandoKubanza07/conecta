"use client";

import { signup } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { accessAccount } from "@/images";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const COUNTRY_CODES = [
  { value: "244", label: "+244" },
  { value: "351", label: "+351" },
  { value: "55", label: "+55" },
  { value: "1", label: "+1" },
  { value: "284", label: "+284" },
];

const ROLES = [
  { value: "event-promoter", label: "Promover Eventos" },
  { value: "land-lord", label: "Disponibilizar Espaços" },
  { value: "service-provider", label: "Disponibilizar Serviços" },
  { value: "user", label: "Comprar Ingressos e ou Arrendar Espaços" },
];

const GENDERS = [
  { value: "female", label: "Feminino" },
  { value: "male", label: "Masculino" },
  { value: "other", label: "Outro" },
];

export default function SignUpPage() {
  const [state, action] = useFormState(signup, undefined);
  const { pending } = useFormStatus();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    role: "",
    name: "",
    gender: "",
    countryCode: "244",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const updateFormField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });
    return action(formDataToSubmit);
  };

  const advanceStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const StepIndicator = () => (
    <div className="flex items-center mb-8">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
      >
        1
      </div>
      <div className="flex-1 h-1 mx-4 bg-gray-200">
        <div
          className={`h-full ${step === 2 ? "bg-indigo-600" : ""} transition-all duration-500`}
          style={{ width: step === 2 ? "100%" : "0%" }}
        ></div>
      </div>
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 2 ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
      >
        2
      </div>
    </div>
  );

  return (
    <section className="sign-layout relative">
      <div className="hidden lg:flex w-1/3">
        <Image src={accessAccount} alt="Access Account" className="w-96" />
      </div>

      <div className="w-full max-w-md bg-white p-12 shadow-lg relative">
        <form action={handleSubmit} className="max-w-md mx-auto">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <StepIndicator />

            {step === 1 ? (
              <div className="space-y-6">
                <div className="bg-indigo-50 p-4 rounded-lg mb-8">
                  <h2 className="text-lg font-medium">Informe os seus dados para criar a sua conta</h2>
                </div>

                <div className="space-y-4">
                  <FormField
                    label="Qual é o seu objectivo dentro da plataforma?"
                    error={state?.errors?.role?.toString()}
                  >
                    <Select name="role" value={formData.role} onValueChange={(value) => updateFormField("role", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Comprar Ingressos..." />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>

                  <FormField label="Nome Completo" error={state?.errors?.name?.toString()}>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Avelino Nicolau Carlito"
                      value={formData.name}
                      onChange={(e) => updateFormField("name", e.target.value)}
                    />
                  </FormField>

                  <FormField label="Género" error={state?.errors?.gender?.toString()}>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onValueChange={(value) => updateFormField("gender", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {GENDERS.map((gender) => (
                          <SelectItem key={gender.value} value={gender.value}>
                            {gender.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>

                  <FormField
                    label="Tel"
                    error={state?.errors?.phoneNumber?.toString() || state?.errors?.countryCode?.toString()}
                  >
                    <div className="flex form-input">
                      <Select
                        name="countryCode"
                        value={formData.countryCode}
                        onValueChange={(value) => updateFormField("countryCode", value)}
                      >
                        <SelectTrigger className="w-[86px] bg-transparent border-0">
                          <SelectValue placeholder="+244" className="bg-transparent" />
                        </SelectTrigger>
                        <SelectContent>
                          {COUNTRY_CODES.map((code) => (
                            <SelectItem key={code.value} value={code.value}>
                              {code.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Input
                        type="tel"
                        name="phoneNumber"
                        placeholder="940 246 517"
                        className="border-0 bg-transparent"
                        value={formData.phoneNumber}
                        onChange={(e) => updateFormField("phoneNumber", e.target.value)}
                      />
                    </div>
                  </FormField>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-indigo-50 p-4 rounded-lg mb-8">
                  <h2 className="text-lg font-medium">Estabeleça as suas credenciais</h2>
                </div>

                <div className="space-y-4">
                  <FormField label="E-mail" error={state?.errors?.email?.toString()}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="ex. qwefanicekbtj@gmail.com"
                      value={formData.email}
                      onChange={(e) => updateFormField("email", e.target.value)}
                    />
                  </FormField>

                  <FormField label="Palavra-passe" error={state?.errors?.password?.toString()}>
                    <Input
                      type="password"
                      name="password"
                      placeholder="**********"
                      value={formData.password}
                      onChange={(e) => updateFormField("password", e.target.value)}
                    />
                  </FormField>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-8">
              {step === 2 && (
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="px-8">
                  Voltar
                </Button>
              )}
              <Button
                type={step === 1 ? "button" : "submit"}
                onClick={step === 1 ? advanceStep : undefined}
                disabled={pending}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8"
              >
                {step === 1 ? "Próximo" : "Criar Conta"}
              </Button>
            </div>

            <div className="mt-6 text-center text-sm">
              <Link href="/sign/in" className="text-indigo-600 hover:underline">
                Já tem uma conta? Inicie sessão.
              </Link>
            </div>
          </motion.div>
        </form>
      </div>

      <div className="absolute top-0 -z-10 left-0 w-[500px] h-[500px] border-[56px] border-white rounded-full opacity-20"></div>
      <div className="absolute bottom-0 -z-10 right-0 w-[600px] h-[600px] border-[56px] border-white rounded-full opacity-20"></div>
    </section>
  );
}

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
}

function FormField({ label, children, error }: FormFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium mb-1 block">{label}</span>
      {children}
      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </label>
  );
}
