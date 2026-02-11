import { client } from "@/sanity/lib/client";
import { SZEMELY_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from 'next/image';
import EmptyState from "@/components/EmptyState";

interface Person {
  slug: string;
  entry: {
    name: string;
    body: string; // Tina's body field is a string
    position?: string | null;
    committees?: ({ name?: string | null; position?: string | null } | null)[] | null;
    image?: string | null;
  };
}

export default async function KepviseloTestuletPage() {


  // Fetch people from Sanity
  const sanityPeople = await client.fetch(SZEMELY_QUERY);

  // Map Sanity data to Person structure
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const people: Person[] = sanityPeople.map((item: any) => ({
    slug: item._id,
    entry: {
      name: item.nev || '',
      body: item.kategoria?.includes('kepviselo-testulet') ? 'kepviselo-testulet' : '', // Mock body check to match existing logic
      position: item.titulus,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      committees: item.bizottsagok?.map((biz: any) => ({ name: biz.nev, position: biz.pozicio })) || [],
      image: item.kep ? urlFor(item.kep).url() : null, // Store full URL here
    }
  }));

  const roleMetadata: { [key: string]: { icon: string; borderColor: string } } = {
    "polgármester": {
      icon: "bi bi-star-fill",
      borderColor: "border-yellow-500",
    },
    "alpolgármester": {
      icon: "bi bi-star-half",
      borderColor: "border-yellow-400",
    },
    "képviselő": {
      icon: "bi bi-person-fill",
      borderColor: "border-gray-400",
    },
  };

  const defaultMetadata = {
    icon: "bi bi-person-fill",
    borderColor: "border-gray-400",
  };

  const members = (people as Person[]) // Cast to Person[] for type safety
    .filter((person: Person) => person.entry.body === 'kepviselo-testulet')
    .map((person: Person) => {
      const role = person.entry.position || 'képviselő';
      return {
        name: person.entry.name,
        role: role,
        image: person.entry.image, // Pass the image filename
        ...(roleMetadata[role.toLowerCase()] || defaultMetadata),
      };
    });


  const roleOrder: { [key: string]: number } = {
    'polgármester': 1,
    'alpolgármester': 2,
    'képviselő': 3,
  };

  members.sort((a, b) => {
    const orderA = roleOrder[a.role.toLowerCase()] || 99;
    const orderB = roleOrder[b.role.toLowerCase()] || 99;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="mt-10 py-12 theme-transition glass-card">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800 dark:text-white">
          A Képviselő-testület tagjai
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">Tyukod Nagyközség Önkormányzatának vezetői és képviselői.</p>

        {members.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8">
            {members.map((member) => (
              <div
                key={member.name}
                className={`w-72 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border-t-4 ${member.borderColor} transform hover:-translate-y-2 transition-transform duration-300`}
              >
                <div className="p-6 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    {member.image ? (
                      <Image
                        src={member.image} // It is already a full URL from Sanity
                        alt={`Profilkép - ${member.name}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <i className={`${defaultMetadata.icon} text-5xl text-gray-400 dark:text-gray-500`}></i>
                      </div>
                    )}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {member.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 capitalize">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nincsenek feltöltött tagok"
            description="A képviselő-testület adatainak betöltése folyamatban van. Kérjük, látogasson vissza később!"
            icon="bi-person-badge"
          />
        )}
      </div>
    </div>
  );
}
