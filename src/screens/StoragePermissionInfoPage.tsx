

const StoragePermissionInfo = () => {
  return (
    <>
    <div className="container">
      <h2>Why We Need Storage Permission</h2>
      <p>
        Our application requires access to your browser's local storage to enhance your experience and
        ensure we can remember certain details such as:
      </p>
      <ul>
        <li>Your theory generation count so that we can prevent multiple submissions and provide a fair
          system.</li>
        <li>Improve performance by storing certain preferences, allowing us to load faster and provide
          personalized content in the future.</li>
        <li>Enable us to offer a more seamless experience when you return to the app, without needing to
          re-enter any data.</li>
      </ul>

      <h3>What Happens If You Deny Permission?</h3>
      <p>
        If you choose to deny access to local storage, we will not be able to save your theory generation
        count or other preferences.
      </p>

      <h3>How We Protect Your Data</h3>
      <p>
        Rest assured, we do not store or share any of your data outside your browser. All the information is
        stored securely in your browser's local storage and is only used for the purpose of improving your app
        experience.
      </p>

      <p>
        If you agree, please enable the storage permission. You can revoke this permission at any time in your
        browser settings.
      </p>
    </div>
    </>
  );
};

export default StoragePermissionInfo;
