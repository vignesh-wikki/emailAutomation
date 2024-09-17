import React from 'react';

const CampaignConfigure = () => {
 const [email, setEmail] = React.useState('');
 const [name, setName] = React.useState('');
 const [campaigns, setCampaigns] = React.useState('');
 const [emailTemplates, setEmailTemplates] = React.useState('');

 const handleSubmit = (e) => {
    e.preventDefault();
 };

 return (
    <div className="bg-white mx-auto items-center shadow-xl rounded px-8 w-[36rem] pt-6 pb-8 mb-4">
      <h1 className="text-2xl font-bold mb-5">Configure your campaign</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className=" text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            From:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="reset"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignConfigure;