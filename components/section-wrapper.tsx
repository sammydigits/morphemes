export const SectionWrapper = ({ bordercolor, children }: any) => {
  return (
    <div
      className={`w-full border-${bordercolor} border-1 px-8 py-4 rounded-small`}
    >
      {children}
    </div>
  );
};
