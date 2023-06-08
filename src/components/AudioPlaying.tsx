export const AudioPlaying = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="playing" onClick={onClick}>
      <span className="playing__bar playing__bar1"></span>
      <span className="playing__bar playing__bar2"></span>
      <span className="playing__bar playing__bar3"></span>
    </div>
  );
};
