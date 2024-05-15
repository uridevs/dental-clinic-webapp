
const SvgIcon = ({ iconId, className = '', style = {}, ...props }) => {
  return (
    <svg className={`icon ${className}`} style={style} {...props}>
      <use xlinkHref={`#${iconId}`} />
    </svg>
  );
};

export default SvgIcon;
