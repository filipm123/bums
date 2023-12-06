//TU JEBNIJ ACCORDION NA TRACKI


const TrackList = ({ item }) => {
  return (
    <div className="flex flex-col gap-2">
      {item.tracks &&
        item.tracks.map((track) => (
          <div
            className="w-full py-4 pl-4 border-2 rounded border-br"
            key={track.id}
          >
            {track}
          </div>
        ))}
    </div>
  );
};

export default TrackList;
