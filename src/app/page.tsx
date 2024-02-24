import SignInButton from "./components/SignInButton";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-base-200 flex-col items-center justify-start p-24 text-b">
      <div className="flex">
        <div className="hero bg-base-200">
          <div className="hero-content min-w-screen flex-col lg:flex-row">
            <HeroFrameCard />
          </div>
        </div>
      </div>
    </main>
  );
}

function HeroFrameCard() {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl text-primary">
      <figure className="px-10 py-0">
        <img
          src="https://i.imgur.com/mDEtUiF.jpeg"
          className="max-w-sm rounded-lg shadow-2xl"
          alt="frameworld logo"
        />
      </figure>
      <div className="card-body bg-base-100 items-center text-center">
        <h2 className="card-title text-secondary">Frameworld</h2>
        <p>Your window into Frames</p>
        <div className="card-actions">
          <SignInButton />
          <button className="btn btn-outline">Explore</button>
        </div>
      </div>
    </div>
  );
}
