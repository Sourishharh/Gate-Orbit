const STORAGE_KEY = 'gate_orbit_data';

const DEFAULT_SYLLABUS = [
  {
    id: "engineering-math",
    name: "Engineering Mathematics",
    topics: [
      { id: "prop-logic", name: "Propositional Logic", completed: false },
      { id: "first-order-logic", name: "First Order Logic", completed: false },
      { id: "sets-relations-functions", name: "Sets, Relations, Functions", completed: false },
      { id: "partial-orders-lattices", name: "Partial Orders & Lattices", completed: false },
      { id: "monoids-groups", name: "Monoids & Groups", completed: false },
      { id: "graph-theory", name: "Graph Theory (connectivity, matching, coloring)", completed: false },
      { id: "combinatorics", name: "Combinatorics (counting, recurrence, generating functions)", completed: false },
      { id: "matrices", name: "Matrices", completed: false },
      { id: "determinants", name: "Determinants", completed: false },
      { id: "linear-equations", name: "System of Linear Equations", completed: false },
      { id: "eigenvalues", name: "Eigenvalues & Eigenvectors", completed: false },
      { id: "lu-decomposition", name: "LU Decomposition", completed: false },
      { id: "limits", name: "Limits", completed: false },
      { id: "continuity", name: "Continuity & Differentiability", completed: false },
      { id: "maxima-minima", name: "Maxima & Minima", completed: false },
      { id: "mean-value", name: "Mean Value Theorem", completed: false },
      { id: "integration", name: "Integration", completed: false },
      { id: "random-variables", name: "Random Variables", completed: false },
      { id: "distributions", name: "Distributions (Uniform, Normal, Exponential, Poisson, Binomial)", completed: false },
      { id: "mean-median-mode", name: "Mean, Median, Mode, Standard Deviation", completed: false },
      { id: "conditional-prob", name: "Conditional Probability", completed: false },
      { id: "bayes-theorem", name: "Bayes Theorem", completed: false },
    ],
    tests: { topicWiseTest: false, subjectWiseTest: false, pyqCompleted: false },
  },
  {
    id: "digital-logic",
    name: "Digital Logic",
    topics: [
      { id: "boolean-algebra", name: "Boolean Algebra", completed: false },
      { id: "combinational-circuits", name: "Combinational Circuits", completed: false },
      { id: "sequential-circuits", name: "Sequential Circuits", completed: false },
      { id: "minimization", name: "Minimization", completed: false },
      { id: "number-representation", name: "Number Representation", completed: false },
      { id: "computer-arithmetic", name: "Computer Arithmetic (fixed & floating point)", completed: false },
    ],
    tests: { topicWiseTest: false, subjectWiseTest: false, pyqCompleted: false },
  },
  {
    id: "computer-org",
    name: "Computer Organization & Architecture",
    topics: [
      { id: "machine-instructions", name: "Machine Instructions", completed: false },
      { id: "addressing-modes", name: "Addressing Modes", completed: false },
      { id: "alu", name: "ALU", completed: false },
      { id: "data-path", name: "Data Path & Control Unit", completed: false },
      { id: "pipelining", name: "Instruction Pipelining", completed: false },
      { id: "pipeline-hazards", name: "Pipeline Hazards", completed: false },
      { id: "memory-hierarchy", name: "Memory Hierarchy", completed: false },
      { id: "cache-memory", name: "Cache Memory", completed: false },
      { id: "main-memory", name: "Main Memory", completed: false },
      { id: "secondary-storage", name: "Secondary Storage", completed: false },
      { id: "io-interface", name: "I/O Interface (Interrupt, DMA)", completed: false },
    ],
    tests: { topicWiseTest: false, subjectWiseTest: false, pyqCompleted: false },
  },
  {
    id: "programming-ds",
    name: "Programming & Data Structures",
    topics: [
      { id: "c-programming", name: "C Programming", completed: false },
      { id: "recursion", name: "Recursion", completed: false },
      { id: "arrays", name: "Arrays", completed: false },
      { id: "stacks", name: "Stacks", completed: false },
      { id: "queues", name: "Queues", completed: false },
      { id: "linked-lists", name: "Linked Lists", completed: false },
      { id: "trees", name: "Trees", completed: false },
      { id: "bst", name: "Binary Search Trees", completed: false },
      { id: "binary-heaps", name: "Binary Heaps", completed: false },
      { id: "graphs", name: "Graphs", completed: false },
    ],
    tests: { topicWiseTest: false, subjectWiseTest: false, pyqCompleted: false },
  },
  {
    id: "algorithms",
    name: "Algorithms",
    topics: [
      { id: "searching", name: "Searching", completed: false },
      { id: "sorting", name: "Sorting", completed: false },
      { id: "hashing", name: "Hashing", completed: false },
      { id: "complexity", name: "Time & Space Complexity", completed: false },
      { id: "greedy", name: "Greedy Algorithms", completed: false },
      { id: "dp", name: "Dynamic Programming", completed: false },
      { id: "divide-conquer", name: "Divide & Conquer", completed: false },
      { id: "graph-traversals", name: "Graph Traversals", completed: false },
      { id: "mst", name: "Minimum Spanning Tree", completed: false },
      { id: "shortest-path", name: "Shortest Path", completed: false },
    ],
    tests: { topicWiseTest: false, subjectWiseTest: false, pyqCompleted: false },
  },
  {
    id: "theory-of-computation",
    name: "Theory of Computation",
    topics: [
      { id: "regex", name: "Regular Expressions", completed: false },
      { id: "finite-automata", name: "Finite Automata", completed: false },
      { id: "cfg", name: "Context-Free Grammar", completed: false },
      { id: "pda", name: "Pushdown Automata", completed: false },
      { id: "regular-languages", name: "Regular Languages", completed: false },
      { id: "cfl", name: "CFL", completed: false },
      { id: "pumping-lemma", name: "Pumping Lemma", completed: false },
      { id: "turing-machines", name: "Turing Machines", completed: false },
      { id: "undecidability", name: "Undecidability", completed: false },
    ],
    tests: { topicWiseTest: false, subjectWiseTest: false, pyqCompleted: false },
  },
  {
    id: "compiler-design",
    name: "Compiler Design",
    topics: [
      { id: "lexical-analysis", name: "Lexical Analysis", completed: false },
      { id: "parsing", name: "Parsing", completed: false },
      { id: "syntax-directed", name: "Syntax Directed Translation", completed: false },
      { id: "runtime-env", name: "Runtime Environment", completed: false },
      { id: "intermediate-code", name: "Intermediate Code Generation", completed: false },
      { id: "local-optimization", name: "Local Optimization", completed: false },
      { id: "data-flow", name: "Data Flow Analysis", completed: false },
      { id: "constant-prop", name: "Constant Propagation", completed: false },
      { id: "liveness", name: "Liveness Analysis", completed: false },
      { id: "cse", name: "Common Subexpression Elimination", completed: false },
    ],
    tests: { topicWiseTest: false, subjectWiseTest: false, pyqCompleted: false },
  },
  {
    id: "operating-systems",
    name: "Operating Systems",
    topics: [
      { id: "system-calls", name: "System Calls", completed: false },
      { id: "processes", name: "Processes", completed: false },
      { id: "threads", name: "Threads", completed: false },
      { id: "ipc", name: "IPC", completed: false },
      { id: "concurrency", name: "Concurrency & Synchronization", completed: false },
      { id: "deadlocks", name: "Deadlocks", completed: false },
      { id: "cpu-scheduling", name: "CPU Scheduling", completed: false },
      { id: "io-scheduling", name: "I/O Scheduling", completed: false },
      { id: "memory-management", name: "Memory Management", completed: false },
      { id: "virtual-memory", name: "Virtual Memory", completed: false },
      { id: "file-systems", name: "File Systems", completed: false },
    ],
    tests: { topicWiseTest: false, subjectWiseTest: false, pyqCompleted: false },
  },
  {
    id: "dbms",
    name: "Databases (DBMS)",
    topics: [
      { id: "er-model", name: "ER Model", completed: false },
      { id: "relational-algebra", name: "Relational Algebra", completed: false },
      { id: "tuple-calculus", name: "Tuple Calculus", completed: false },
      { id: "sql", name: "SQL", completed: false },
      { id: "integrity-constraints", name: "Integrity Constraints", completed: false },
      { id: "normal-forms", name: "Normal Forms", completed: false },
      { id: "file-organization", name: "File Organization", completed: false },
      { id: "indexing", name: "Indexing (B, B+ Trees)", completed: false },
      { id: "transactions", name: "Transactions", completed: false },
      { id: "concurrency-control", name: "Concurrency Control", completed: false },
    ],
    tests: { topicWiseTest: false, subjectWiseTest: false, pyqCompleted: false },
  },
  {
    id: "computer-networks",
    name: "Computer Networks",
    topics: [
      { id: "osi-model", name: "OSI Model", completed: false },
      { id: "tcp-ip-model", name: "TCP/IP Model", completed: false },
      { id: "switching", name: "Switching (Packet, Circuit, Virtual Circuit)", completed: false },
      { id: "data-link", name: "Data Link Layer", completed: false },
      { id: "framing", name: "Framing", completed: false },
      { id: "error-detection", name: "Error Detection", completed: false },
      { id: "mac", name: "MAC", completed: false },
      { id: "ethernet", name: "Ethernet", completed: false },
      { id: "routing-algorithms", name: "Routing Algorithms", completed: false },
      { id: "distance-vector", name: "Distance Vector", completed: false },
      { id: "link-state", name: "Link State", completed: false },
      { id: "ip-addressing", name: "IP Addressing", completed: false },
      { id: "ipv4", name: "IPv4", completed: false },
      { id: "cidr", name: "CIDR", completed: false },
      { id: "arp-dhcp-icmp", name: "ARP, DHCP, ICMP", completed: false },
      { id: "nat", name: "NAT", completed: false },
      { id: "tcp-udp", name: "Transport Layer (TCP, UDP)", completed: false },
      { id: "flow-congestion", name: "Flow & Congestion Control", completed: false },
      { id: "sockets", name: "Sockets", completed: false },
      { id: "application-layer", name: "Application Layer (DNS, HTTP, FTP, SMTP, Email)", completed: false },
    ],
    tests: { topicWiseTest: false, subjectWiseTest: false, pyqCompleted: false },
  },
];

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = JSON.parse(JSON.stringify(DEFAULT_SYLLABUS));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return JSON.parse(JSON.stringify(DEFAULT_SYLLABUS));
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getCompletion(subject) {
  if (subject.topics.length === 0) return 0;
  const done = subject.topics.filter(t => t.completed).length;
  return Math.round((done / subject.topics.length) * 100);
}

export function getSubjects() {
  const data = loadData();
  return data.map(s => ({ ...s, completionPercent: getCompletion(s) }));
}

export function toggleTopic(subjectId, topicId) {
  const data = loadData();
  const subject = data.find(s => s.id === subjectId);
  if (!subject) throw new Error('Subject not found');
  const topic = subject.topics.find(t => t.id === topicId);
  if (!topic) throw new Error('Topic not found');
  topic.completed = !topic.completed;
  saveData(data);
  return { ...subject, completionPercent: getCompletion(subject) };
}

export function toggleTest(subjectId, testType) {
  const validTypes = ['topicWiseTest', 'subjectWiseTest', 'pyqCompleted'];
  if (!validTypes.includes(testType)) throw new Error('Invalid testType');
  const data = loadData();
  const subject = data.find(s => s.id === subjectId);
  if (!subject) throw new Error('Subject not found');
  subject.tests[testType] = !subject.tests[testType];
  saveData(data);
  return { ...subject, completionPercent: getCompletion(subject) };
}

export function resetAll() {
  const reset = DEFAULT_SYLLABUS.map(s => ({
    ...s,
    topics: s.topics.map(t => ({ ...t, completed: false })),
    tests: { topicWiseTest: false, subjectWiseTest: false, pyqCompleted: false },
  }));
  saveData(reset);
  return { success: true, message: 'All progress has been reset.' };
}

export function getDashboard() {
  const data = loadData();
  let totalTopics = 0, completedTopics = 0, completedSubjects = 0;
  let totalTestsDone = 0, pyqDone = 0;

  for (const s of data) {
    totalTopics += s.topics.length;
    const done = s.topics.filter(t => t.completed).length;
    completedTopics += done;
    if (done === s.topics.length && s.topics.length > 0) completedSubjects++;
    if (s.tests.topicWiseTest) totalTestsDone++;
    if (s.tests.subjectWiseTest) totalTestsDone++;
    if (s.tests.pyqCompleted) { totalTestsDone++; pyqDone++; }
  }

  return {
    totalCompletionPercent: totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0,
    completedSubjects,
    pendingSubjects: data.length - completedSubjects,
    totalTestsDone,
    pyqCompletionPercent: Math.round((pyqDone / data.length) * 100),
    totalTopics,
    completedTopics,
  };
}
