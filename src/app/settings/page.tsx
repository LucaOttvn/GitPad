import "./style.scss";
import ReposList from "@/src/components/reposList/ReposList";

export default function SettingsPage() {
  return (
    <div className="w-full h-full flex justify-start items-start flex-col p-4 gap-8">
      <h1
        className="w-full text-center"
        style={{
          fontSize: "200%",
        }}
      >
        Settings
      </h1>
      <ReposList />
      {/* <Button onClick={signOut} iconSrc="/icons/logout.svg" label="Logout" /> */}
    </div>
  );
}
