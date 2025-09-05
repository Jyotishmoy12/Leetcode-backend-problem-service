import { Request, Response } from "express";
import { ProblemService } from "../services/problem.services";
import { ProblemRepository } from "../repositories/problem.repository";

// export interface IProblemController {
//   createProblem: (req: Request, res: Response) => Promise<void>;
//   getProblemById: (req: Request, res: Response) => Promise<void>;
//   getAllProblems: (req: Request, res: Response) => Promise<void>;
//   updateProblem: (req: Request, res: Response) => Promise<void>;
//   deleteProblem: (req: Request, res: Response) => Promise<void>;
//   findByDifficulty: (req: Request, res: Response) => Promise<void>;
//   searchProblems: (req: Request, res: Response) => Promise<void>;
// }

const problemRepository = new ProblemRepository();
const problemService = new ProblemService(problemRepository);

export const ProblemController = {
  async createProblem(req: Request, res: Response): Promise<void> {
    const problem = await problemService.createProblem(req.body);
    res.status(201).json({
      message: "Problem created successfully",
      success: true,
      data: problem,
    });
  },
  async getProblemById(req: Request, res: Response): Promise<void> {
    const problem = await problemService.getProblembyId(req.params.id);
    res.status(200).json({
      message: "Problem fetched successfully",
      success: true,
      data: problem,
    });
  },
  async getAllProblems(req: Request, res: Response): Promise<void> {
    const problems = await problemService.getAllProblems();
    res.status(200).json({
      message: "Problems fetched successfully",
      success: true,
      data: problems,
    });
  },
  async updateProblem(req: Request, res: Response): Promise<void> {
    const problem = await problemService.updateProblem(
      req.params.id,
      req.body
    );
    res.status(200).json({
      message: "Problem updated successfully",
      success: true,
      data: problem,
    });
  },
  async deleteProblem(req: Request, res: Response): Promise<void> {
    const problem = await problemService.deleteProblem(req.params.id);
    res.status(200).json({
      message: "Problem deleted successfully",
      success: true,
      data: problem,
    });
  },
  async findByDifficulty(req: Request, res: Response): Promise<void> {
    const difficulty = req.params.difficulty as "easy" | "medium" | "hard";
    const problems = await problemService.findByDifficulty(difficulty);
    res.status(200).json({
      message: "Problems fetched successfully using difficulty",
      success: true,
      data: problems,
    });
  },
  async searchProblems(req: Request, res: Response): Promise<void> {
    const problems = await problemService.searchProblems(
      req.params.query as string
    );
    res.status(200).json({
      message: "Problems fetched successfully",
      success: true,
      data: problems,
    });
  }
}
