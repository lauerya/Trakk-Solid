interface Task {
    created_at?: string
    name: string;
    areaId?: number;
    assignedTo: string;
    dueDate?: string;
    completed: boolean;
    completedDate?: string;
    effort?: number;
    frequency?: number;
    frequencyType?: string;
    description?: string;
    user_id: string;
}

interface Area {
    created_at: string;
    name: string;
    image: string;
    description: string;
    house_id: number;
    user_id: string;
}

interface House {
    created_at: string;
    name: string;
    homeOwners: any;
    areas: any;
    yearBuilt: number;
    hvacType: string;
    userId: string;
}

interface Profile {
    updated_at: string;
    username: string;
    full_name: string;
    avatar_url: string;
    website: string;
    user_id: string;

}

interface TaskList {
    taskList: Task[];
}

interface AreaList {
    areaList: Area[];
}

interface User {
    id: string;
    userName: string;
    avatar_url: string;
    website: string;
}
