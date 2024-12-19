const permissionsCode = {
    PROJECT: {
        UPDATE: "P_U",
        CLOSE: "P_U_CLOSE",
        MEMBER_MANAGER: "P_MEMBER",
        MEMBER_GANT: "P_MEMBER_GANT",
        ROLE_MANAGER: "P_ROLE",
        PRIORITY_MANAGER: "P_PRIORITY",
        STATUS_MANAGER: "P_STATUS",
        TRACKER_MANAGER: "P_TRACKER",
        DELETE: "P_D",
    },
    ISSUE: {
        CREATE: "I_C",
        DELETE: {
            ANY: "I_D_ANY",
            OWN: "I_D_OWN",
            ASSIGNEE: "I_D_ASSIGNEE",
        },
        CLOSE: {
            ANY: "I_C_ANY",
            OWN: "I_C_OWN",
            ASSIGNEE: "I_C_ASSIGNEE",
        },
        STATUS: {
            ANY: "I_S_ANY",
            OWN: "I_S_OWN",
            ASSIGNEE: "I_S_ASSIGNEE",
        },
        PRIORITY: {
            ANY: "I_P_ANY",
            OWN: "I_P_OWN",
            ASSIGNEE: "I_P_ASSIGNEE",
        },
        TRACKER: {
            ANY: "I_T_ANY",
            OWN: "I_T_OWN",
            ASSIGNEE: "I_T_ASSIGNEE",
        },
        UPDATE: {
            ANY: "I_U_ANY",
            OWN: "I_U_OWN",
            ASSIGNEE: "I_U_ASSIGNEE",
        },
        NOTE: {
            ANY: "I_N_ANY",
            OWN: "I_N_OWN",
            ASSIGNEE: "I_N_ASSIGNEE",
        },
        CHECK_LIST: {
            ANY: "I_CL_ANY",
            OWN: "I_CL_OWN",
            ASSIGNEE: "I_CL_ASSIGNEE",
        },
        ASSIGNEE: {
            ANY: "I_A_ANY",
            OWN: "I_A_OWN",
        },
    },
    COMMENT: {
        CREATE: {
            ANY: "C_C_ANY",
            OWN: "C_C_OWN",
            ASSIGNEE: "C_C_ASSIGNEE",
        },
        DELETE:{
            ANY: "C_D_ANY",
            OWN: "C_D_OWN",
        }
        
    }
}
export default permissionsCode;
