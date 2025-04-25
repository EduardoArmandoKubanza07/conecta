export const WrapperContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <section className="flex w-full flex-col p-8" style={{ maxWidth: 1440 }}>
        {children}
      </section>
    </div>
  );
};
