const ColoredLine = ({options}) => (
    <hr
        style={{
            color: typeof options.color !=="undefined" ? options.color: "#2a378b",
            backgroundColor: typeof options.color !=="undefined" ? options.color: "#2a378b",
            height:  typeof options.height !=="undefined" ? options.height: 5,
        }}
    />
);

export default ColoredLine;