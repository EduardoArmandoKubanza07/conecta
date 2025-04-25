import Image from "next/image";
import user from "@/images/icons/user.svg";

export default function ChooseUser() {
  return (
    <section className="sign-layout">
      <div className="flex w-96 max-w-sm flex-col items-center gap-8 rounded-lg bg-white p-8 shadow-lg shadow-black/20">
        <h2> ConectaEventos </h2>

        <form className="flex w-full flex-col gap-2">
          <label htmlFor="choose-user" className="font-semibold text-primary">
            Define o tipo de utilizador
          </label>
          <div className="form-input flex w-full">
            <Image src={user} alt={""} />
            <select name="choose-user" id="choose-user" className="w-full text-xs text-gray-400 outline-none">
              <option value="">Selecione o tipo de utilizador</option>
            </select>
          </div>
          <button className="form-button">Finalizar registro</button>
        </form>
      </div>
    </section>
  );
}
