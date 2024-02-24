
export default function ProfileAvatar({ url }: { url: string }) {
  return (
    <div className="avatar">
      <div className="w-12 rounded-full">
        <img src={url} />
      </div>
    </div>
  );
}
