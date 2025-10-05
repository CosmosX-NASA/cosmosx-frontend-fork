// Research Gap 더미 데이터

export const researchGapData = {
  conceptual: [
    {
      id: "CON-001",
      title:
        "Build a Space Biology Knowledge EngineBuild a Space Biology Knowledge EngineBuild a Space Biology Knowledge Engine",
      content:
        "The core components that constitute digital trust have not been clearly defined.",
      evidence:
        "Existing literature tends to use 'trust' interchangeably with concepts such as technology acceptance, privacy protection, and perceived risk.",
    },
    {
      id: "CON-002",
      title: "The Space Omics and Medical Atlas (SOMA)",
      content:
        "Lack of unified theoretical framework for integrating multi-omics data in space biology research.",
      evidence:
        "Current studies approach omics integration from isolated perspectives without establishing coherent theoretical connections.",
    },
    {
      id: "CON-003",
      title: "An open source knowledge graph ecosystem for the life sciences",
      content:
        "Insufficient conceptual clarity on the relationship between ontology alignment and knowledge graph interoperability.",
      evidence:
        "Research papers discuss technical implementations without addressing underlying conceptual foundations.",
    },
    {
      id: "CON-004",
      title:
        "Database of space life investigations and bioinformatics resources",
      content:
        "Theoretical gap in understanding how metadata standardization impacts research reproducibility.",
      evidence:
        "Studies focus on practical metadata schemas without developing theoretical models of standardization effects.",
    },
    {
      id: "CON-005",
      title: "Constructing knowledge graphs and their biomedical applications",
      content:
        "Conceptual ambiguity in defining boundaries between entity normalization and entity resolution.",
      evidence:
        "Literature uses these terms inconsistently, creating confusion about fundamental knowledge graph operations.",
    },
  ],
  methodological: [
    {
      id: "METH-001",
      title: "Build a Space Biology Knowledge Engine",
      content:
        "No standardized methodology exists for evaluating knowledge engine performance across diverse biological datasets.",
      evidence:
        "Current evaluation approaches vary significantly, making cross-study comparisons impossible.",
    },
    {
      id: "METH-002",
      title: "The Space Omics and Medical Atlas (SOMA)",
      content:
        "Methodological limitations in validating multi-omics data integration pipelines.",
      evidence:
        "Validation procedures are often ad-hoc without systematic approaches for ensuring integration accuracy.",
    },
    {
      id: "METH-003",
      title: "An open source knowledge graph ecosystem for the life sciences",
      content:
        "Lack of rigorous methods for assessing ontology mapping quality in automated pipelines.",
      evidence:
        "Most studies report mapping coverage without addressing precision, recall, or semantic coherence.",
    },
    {
      id: "METH-004",
      title:
        "Database of space life investigations and bioinformatics resources",
      content:
        "Insufficient methodological guidelines for cross-platform data harmonization in space biology.",
      evidence:
        "Data from different platforms use incompatible formats without established harmonization protocols.",
    },
    {
      id: "METH-005",
      title: "Constructing knowledge graphs and their biomedical applications",
      content:
        "Methodological gap in systematic evaluation of relation extraction algorithms for biomedical texts.",
      evidence:
        "Existing benchmarks focus on general NLP tasks rather than domain-specific biomedical relation extraction.",
    },
  ],
  empirical: [
    {
      id: "EMP-001",
      title: "Build a Space Biology Knowledge Engine",
      content:
        "Limited empirical evidence on user interaction patterns with space biology knowledge engines.",
      evidence:
        "Most studies report system capabilities without analyzing actual usage patterns or user behavior.",
    },
    {
      id: "EMP-002",
      title: "The Space Omics and Medical Atlas (SOMA)",
      content:
        "Insufficient longitudinal data on biological adaptations during extended spaceflight missions.",
      evidence:
        "Current data primarily comes from short-duration missions, leaving long-term effects poorly characterized.",
    },
    {
      id: "EMP-003",
      title: "An open source knowledge graph ecosystem for the life sciences",
      content:
        "Lack of comprehensive empirical studies comparing different knowledge graph construction approaches.",
      evidence:
        "Research focuses on individual methods without systematic comparative evaluations across approaches.",
    },
    {
      id: "EMP-004",
      title:
        "Database of space life investigations and bioinformatics resources",
      content:
        "Empirical gap in understanding the impact of database design on research discovery rates.",
      evidence:
        "While databases are widely used, their actual impact on accelerating discoveries remains unquantified.",
    },
    {
      id: "EMP-005",
      title: "Constructing knowledge graphs and their biomedical applications",
      content:
        "Limited real-world validation data for knowledge graph-based clinical decision support systems.",
      evidence:
        "Most evaluations use retrospective data without prospective clinical validation studies.",
    },
  ],
};

export const analystDescriptions = {
  conceptual: {
    image: "/conceptual.png",
    title: "Conceptual",
    description: '"I focus on establishing coherent theoretical frameworks."',
    color: "#3E454B",
  },
  methodological: {
    image: "/methodological.png",
    title: "Methodological",
    description: '"I ensure methodological rigor and measurement validity."',
    color: "#61707B",
  },
  empirical: {
    image: "/empirical.png",
    title: "Empirical",
    description:
      '"I emphasize evidence robustness and comprehensive data coverage."',
    color: "#869DAD",
  },
};
