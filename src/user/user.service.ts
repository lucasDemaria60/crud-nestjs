import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  @InjectRepository(User)
  private usersRepository: Repository<User>;

  public async create(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.save(createUserDto)
      return {
        statusCode: 200,
        msg: 'El usuario se creó correctamente'
      };
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepository.find()
      if (users.length>0){
        return users
      } else {
        return {
          msg: 'No existen usuarios'
        };
      }
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.usersRepository.findOneBy({id})
      return user
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async update(id: number, newUser: UpdateUserDto) {
    try {
      await this.usersRepository.update(id , newUser)
      return {
        statusCode: 200,
        msg: 'El usuario se modificó con éxito'
      }; 
    } catch (error) {
      return new BadRequestException(error)
  }
}

  async remove(id: number) {
    try {
      await this.usersRepository.delete(id)
      return {
        statusCode: 200,
        msg: 'El usuario se ha eliminado satisfactoriamente'
      };
    } catch (error) {
      return new BadRequestException(error)
    }
}
}
