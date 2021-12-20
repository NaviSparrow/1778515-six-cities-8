function Spinner(): JSX.Element {
  return (
    <div className="loader">
      <p>Loading...</p>
      <div className="lds-dual-ring"/>
    </div>
  );
}

export default Spinner;
