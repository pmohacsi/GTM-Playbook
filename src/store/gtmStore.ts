import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PHASES, STAKEHOLDERS } from '../data/gtmData';

export interface ConfiguredStakeholder {
  stakeholderId: string;
  personName: string;
  personEmail?: string;
}

export interface ConfiguredTask {
  taskId: string;
  included: boolean;
  assignedStakeholderId?: string;
  customNote?: string;
}

export interface ConfiguredPhase {
  phaseId: string;
  included: boolean;
  tasks: ConfiguredTask[];
}

export type LaunchType = 'full' | 'soft' | 'beta' | 'internal' | '';

export interface GTMConfig {
  id: string;
  name: string;
  description: string;
  // Framing / initiative parameters
  initiativeOwner: string;       // person accountable for the GTM end-to-end
  productArea: string;           // product, feature, or capability going to market
  targetAudience: string;        // customer segment or ICP
  launchType: LaunchType;        // type of launch
  targetLaunchDate: string;      // ISO date string, or empty
  successMetric: string;         // north-star objective / key success measure
  createdAt: string;
  updatedAt: string;
  stakeholders: ConfiguredStakeholder[];
  phases: ConfiguredPhase[];
  status: 'draft' | 'active' | 'archived';
}

interface GTMStore {
  configs: GTMConfig[];
  activeConfigId: string | null;
  createConfig: (partial: Partial<GTMConfig>) => string;
  updateConfig: (id: string, updates: Partial<GTMConfig>) => void;
  deleteConfig: (id: string) => void;
  setActiveConfig: (id: string | null) => void;
  getConfig: (id: string) => GTMConfig | undefined;
}

function createDefaultConfig(partial: Partial<GTMConfig>): GTMConfig {
  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    initiativeOwner: '',
    productArea: '',
    targetAudience: '',
    launchType: '',
    targetLaunchDate: '',
    successMetric: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft',
    stakeholders: STAKEHOLDERS.map(s => ({ stakeholderId: s.id, personName: '' })),
    phases: PHASES.map(phase => ({
      phaseId: phase.id,
      included: true,
      tasks: phase.tasks.map(task => ({
        taskId: task.id,
        included: true,
      })),
    })),
    ...partial,
  };
}

const SEED_CONFIG: GTMConfig = createDefaultConfig({
  id: 'seed-archicad-31',
  name: 'Archicad 31 Launch GTM',
  description: 'This initiative is the GTM activation effort to convert 90% of existing perpetual licenses to subscriptions',
  initiativeOwner: 'Pelin',
  productArea: 'New version of the product focusing on performance improvements and collaboration features',
  targetAudience: 'Persona 1 and 2',
  launchType: 'full',
  targetLaunchDate: '2027-01-10',
  successMetric: '20% conversion in the 1st month, 60% within half yr, 10% by the next release',
  status: 'active',
  stakeholders: [
    { stakeholderId: 'product-management',        personName: 'James'  },
    { stakeholderId: 'product-marketing',         personName: 'Pelin'  },
    { stakeholderId: 'marketing-creative',        personName: 'Hana'   },
    { stakeholderId: 'product-enablement',        personName: 'Bence'  },
    { stakeholderId: 'sales-enablement',          personName: 'Nick'   },
    { stakeholderId: 'sales',                     personName: 'Zoli'   },
    { stakeholderId: 'customer-success',          personName: 'Andi'   },
    { stakeholderId: 'journey-design',            personName: 'Eszter' },
    { stakeholderId: 'release-program-management', personName: 'Évi'   },
    { stakeholderId: 'portfolio-leadership',      personName: 'Kpg'    },
  ],
});

export const useGTMStore = create<GTMStore>()(
  persist(
    (set, get) => ({
      configs: [SEED_CONFIG],
      activeConfigId: null,

      createConfig: (partial) => {
        const config = createDefaultConfig(partial);
        set(state => ({ configs: [...state.configs, config] }));
        return config.id;
      },

      updateConfig: (id, updates) => {
        set(state => ({
          configs: state.configs.map(c =>
            c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
          ),
        }));
      },

      deleteConfig: (id) => {
        set(state => ({
          configs: state.configs.filter(c => c.id !== id),
          activeConfigId: state.activeConfigId === id ? null : state.activeConfigId,
        }));
      },

      setActiveConfig: (id) => set({ activeConfigId: id }),

      getConfig: (id) => get().configs.find(c => c.id === id),
    }),
    { name: 'gtm-configurator-storage-v2' }
  )
);
