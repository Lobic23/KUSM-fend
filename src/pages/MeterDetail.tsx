import { useParams } from "react-router-dom";

export default function MeterDetail() {
  const { meterId } = useParams();
  
  const meterName = meterId
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'Unknown Meter';

  return (
    <>
      <h1> {meterName} </h1>
    </>
  );
}