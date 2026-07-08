import { useEffect, useState } from "react";
import { supabase, type TeamMember } from "../lib/supabase";

export function useTeam() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const env = (import.meta as unknown as { env: Record<string, string> }).env;
        if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) {
          setTeam(getDemoTeam());
          return;
        }

        const { data, error } = await supabase
          .from("team_members")
          .select("*")
          .eq("is_active", true)
          .order("order_index", { ascending: true });

        if (error) throw error;
        setTeam((data as TeamMember[]) || []);
      } catch {
        setTeam(getDemoTeam());
      } finally {
        setLoading(false);
      }
    }

    fetchTeam();
  }, []);

  return { team, loading };
}

function getDemoTeam(): TeamMember[] {
  return [
    {
      id: "1",
      name: "Adrian Gift",
      role: "C0-Founder & Host",
      bio: "Television sparked my curiosity, but digital storytelling fueled my purpose. As a communications advocate and media enthusiast, I thrive on exploring the spaces where technology meets human connection. I believe that every story has a home, and if that home doesn't exist, we build it. WATALII is my answer to the 'experience gap'—a vibrant, digital universe where curiosity is the only requirement for entry. Whether I’m uncovering hidden narratives or designing new ways to communicate impact, I’m here to prove that if you have a voice, you have a platform.",
      image: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1782075353/1000080077_w3q17i.jpg",
      email: null,
      phone: "+254 725513280",
      social_links: {},
      order_index: 0,
      is_active: true,
      created_at: "",
      updated_at: "",
    },
    {
      id: "2",
        name: "Charles Savali",
        role: "C0-Founder & Host",
        bio: "Charles Savali is a Development Communication student at the University of Nairobi, a student journalist, youth leader and media enthusiast from Makueni County, Kenya. He is passionate about leveraging communication, media and leadership to drive social change, community development and youth empowerment.As a co-founder of Watalii Podcast, Charles has created a platform that fosters meaningful conversations on leadership, culture, education, development and contemporary societal issues. Through storytelling, journalism and digital media, he seeks to amplify community voices and promote informed public discourse. Charles has actively participated in student leadership and community engagement initiatives, championing mentorship, education and youth development programs. His interests span journalism, strategic communication, public relations, advocacy, content creation and development communication. With a strong commitment to excellence and service, Charles aspires to build a career in media and communication where he can contribute to sustainable development, inspire positive social transformation and empower communities through effective communication.",
        image: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1782074946/1000080066_rpghso.jpg",
        email: null,
        phone: null,
        social_links: {},
        order_index: 1,
        is_active: true,
        created_at: "",
        updated_at: "",
    },
    {
      id: "3",
      name: "Jennipher Migot",
      role: "C0-Founder & Host",
      bio: "Hi, I'm Jenipher Migot, a journalism student who loves good conversations, storytelling, and meeting people from different walks of life. I'm naturally curious and enjoy learning about people's experiences, cultures, and the ideas that shape our communities. Through Watalii Podcast, I hope to share authentic stories, have meaningful conversations, and create a space where people feel heard, inspired, and connected. When I'm not behind a microphone, you'll probably find me on a tennis court, working on a creative project, or exploring new opportunities to learn and grow.",
      image: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1782075358/1000080078_ihjgwx.jpg",
      email: null,
      phone: null,
      social_links: {},
      order_index: 2,
      is_active: true,
      created_at: "",
      updated_at: "",
    },
    {
      id: "4",
      name: "Kenedy Osiro",
      role: "Head of Production",
      bio: "Kennedy Osiro is a creative storyteller who enjoys bringing people and ideas together through meaningful conversations.He is passionate about exploring different perspectives,creating engaging content, and building connections that resonate with audiences.Known for his teamwork, reliability, and positive attitude,Kennedy believes that the best stories come from collaboration,curiosity, and authentic human experiences.",
      image: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1782073780/IMG_20260617_144924_662_gwy74z.jpg",
      mail: null,
      phone: null,
      social_links: {},
      order_index: 3,
      is_active: true,
      created_at: "",
      updated_at: "",
    },
     {
         id: "5",
         name: "Malcolm Luxx",
         role: "Editing Lead",
         bio: "Malcolm Luxx is a creative video editor and digital storyteller at Watalii Podcast. Passionate about visual storytelling, he specializes in transforming conversations, experiences, and ideas into engaging content that resonates with audiences. Through dynamic editing, creative direction, and a keen eye for detail, he helps bring the podcast's stories to life across digital platforms.",
         image: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1782073817/IMG_5239_umiqj4.png",
         email: null,
         phone: null,
         social_links: {},
         order_index: 4,
         is_active: true,
         created_at: "",
         updated_at: "",
         },
     {
         id: "6",
         name: "Blessed Ragu",
         role: "Host",
         bio: "I’ve always believed that the most powerful stories are the ones that connect us to our roots while opening a window to the world. As a Public Relations and Mass Communication specialist, I focus on the intersection of strategic communication, digital media, and authentic storytelling.You can usually find me at this intersection in a few different ways: behind the mic as a cast member and social media manager for the Watalii Podcast, where I help shape our on-air conversations and drive our digital growth or diving into deep-dives and social commentary over on my Substack. I love building digital spaces where impactful conversations can thrive.",
         image: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1782075371/1000080076_pqawkp.jpg",
         email: null,
         phone: null,
         social_links: {},
         order_index: 5,
         is_active: true,
         created_at: "",
         updated_at: "",
         },
     {
        id: "7",
         name: "Purity Mutheu Nzomo",
         role: "Set Designer",
         bio: "Purity is the Set Designer at Watalii Podcast, where she brings creativity, style, and attention to detail to every recording session. From developing visual concepts to creating an inviting atmosphere, she plays a key role in shaping the podcast's unique identity. Through thoughtful set design and attention to detail, she creates engaging spaces that enhance the storytelling experience and reflect the podcast's vibrant personality. Her passion for creativity and aesthetics helps transform each recording into an environment where meaningful conversations can thrive.",
         image: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1782074946/1000080051_ucgvsm.jpg",
         email: null,
         phone: null,
         social_links: {},
         order_index: 6,
         is_active: true,
         created_at: "",
         updated_at: "",
      },
  {
        id: "8",
        name: "Hilda Wangari",
        role: "Host",
        bio: "",
        image: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1782075353/1000080079_chomm9.jpg",
        email: null,
        phone: null,
        social_links: {},
        order_index: 7,
        is_active: true,
        created_at: "",
        updated_at: "",
       },
     {
        id: "9",
        name: "Sharon Wangeci",
        role: "Social Media Creator",
        bio: "",
        image: "",
        email: null,
        phone: null,
        social_links: {},
        order_index: 8,
        is_active: true,
        created_at: "",
        updated_at: "",
      },
  {
        id: "10",
        name: "Mutuku",
        role: "Host",
        bio: "",
        image: "",
        email: null,
        phone: null,
        social_links: {},
        order_index: 9,
        is_active: true,
        created_at: "",
        updated_at: "",
       },
  ];
}
