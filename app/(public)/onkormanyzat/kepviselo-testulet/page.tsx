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
    <div className="relative min-h-screen pt-24 pb-20 overflow-hidden theme-transition bg-transparent">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-red-600/10 dark:bg-red-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-indigo-600/10 dark:bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-red-100/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-600 dark:text-red-400 font-orbitron">
              Helyi Irányítás
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter font-orbitron mb-6 uppercase">
            Képviselő-testület
            <span className="block h-1.5 w-24 bg-gradient-to-r from-red-600 to-indigo-600 mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
            Tyukod Nagyközség Önkormányzatának vezetői és választott képviselői, akik a közösségünk fejlődéséért és gyarapodásáért dolgoznak.
          </p>
        </div>

        {members.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">
            {members.map((member) => (
              <div
                key={member.name}
                className="group/card relative"
              >
                {/* Shadow/Glow effect on hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-red-600/20 to-indigo-600/20 rounded-3xl blur opacity-0 group-hover/card:opacity-100 transition duration-500`}></div>

                <div className="relative bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl border border-white/20 dark:border-stone-800 rounded-3xl p-8 h-full flex flex-col items-center text-center hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-300">
                  <div className={`relative p-1 rounded-2xl bg-gradient-to-b from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-800 mb-6 shadow-lg group-hover/card:shadow-red-500/10 transition-shadow duration-500`}>
                    <div className="relative w-28 h-28 overflow-hidden rounded-xl bg-stone-50 dark:bg-stone-800">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={`Profilkép - ${member.name}`}
                          fill
                          className="object-cover transform group-hover/card:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-300 dark:text-stone-600">
                          <i className="bi bi-person-fill text-5xl"></i>
                        </div>
                      )}
                    </div>
                    {/* Role indicator dot */}
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white dark:border-stone-900 ${member.role.toLowerCase().includes('polgármester') ? 'bg-red-500' : 'bg-green-500'
                      }`}></div>
                  </div>

                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                    {member.name}
                  </h4>

                  <div className="mt-auto pt-4 flex flex-col items-center">
                    <span className={`px-3 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 group-hover/card:bg-red-500/10 text-stone-500 dark:text-stone-400 group-hover/card:text-red-600 dark:group-hover/card:text-red-400 text-xs font-bold uppercase tracking-widest transition-colors duration-300`}>
                      {member.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/40 dark:bg-stone-900/40 backdrop-blur-xl border border-stone-200 dark:border-stone-800 rounded-[3rem] p-16 max-w-4xl mx-auto">
            <EmptyState
              title="Nincsenek feltöltött tagok"
              description="A képviselő-testület adatainak betöltése folyamatban van. Kérjük, látogasson vissza később!"
              icon="bi-person-badge"
            />
          </div>
        )}
      </div>
    </div>
  );
}
